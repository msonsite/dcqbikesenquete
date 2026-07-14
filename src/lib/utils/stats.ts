import type { SurveyAnswer, DashboardStats } from "@/types/survey";
import { SOURCE_OPTIONS } from "@/lib/constants";

const INFLUENCE_LABELS: Record<string, string> = {
  decisive: "Bracht klant naar winkel",
  helped: "Gaf nuttige info vooraf",
  no_influence: "Bekeken, geen invloed",
  not_visited: "Niet bekeken",
};

const CUSTOMER_TYPE_LABELS: Record<string, string> = {
  new: "Nieuwe klant",
  returning: "Bestaande klant",
};

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(key: string): string {
  const [year, month] = key.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("nl-BE", { month: "short", year: "numeric" });
}

/** ISO week label (bijv. "2026-W28") */
function getWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function countByField(
  answers: SurveyAnswer[],
  field: keyof SurveyAnswer,
  options?: readonly string[]
): { name: string; value: number; count: number }[] {
  const counts = new Map<string, number>();

  if (options) {
    options.forEach((opt) => counts.set(opt, 0));
  }

  answers.forEach((a) => {
    const raw = a[field];
    const key =
      typeof raw === "boolean" ? (raw ? "Ja" : "Nee") : String(raw ?? "Onbekend");
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const total = answers.length || 1;

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      value: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

function percentage(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

/** Bereken alle dashboard-statistieken uit ruwe antwoorden */
export function computeDashboardStats(answers: SurveyAnswer[]): DashboardStats {
  const now = new Date();
  const todayStart = startOfDay(now);
  const monthStart = startOfMonth(now);

  const today = answers.filter(
    (a) => new Date(a.created_at) >= todayStart
  ).length;

  const thisMonth = answers.filter(
    (a) => new Date(a.created_at) >= monthStart
  ).length;

  const monthlyMap = new Map<string, number>();
  const monthlyAssistedMap = new Map<string, number>();
  const weeklyMap = new Map<string, number>();
  const weeklyAssistedMap = new Map<string, number>();

  answers.forEach((a) => {
    const date = new Date(a.created_at);
    const monthKey = formatMonthKey(date);
    monthlyMap.set(monthKey, (monthlyMap.get(monthKey) ?? 0) + 1);
    const weekKey = getWeekKey(date);
    weeklyMap.set(weekKey, (weeklyMap.get(weekKey) ?? 0) + 1);

    if (a.website_influence === "decisive" || a.website_influence === "helped") {
      monthlyAssistedMap.set(
        monthKey,
        (monthlyAssistedMap.get(monthKey) ?? 0) + 1
      );
      weeklyAssistedMap.set(
        weekKey,
        (weeklyAssistedMap.get(weekKey) ?? 0) + 1
      );
    }
  });

  const monthlyData = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([month, count]) => ({
      month: formatMonthLabel(month),
      count,
      assisted: monthlyAssistedMap.get(month) ?? 0,
    }));

  const weeklyData = Array.from(weeklyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([week, count]) => ({
      week,
      count,
      assisted: weeklyAssistedMap.get(week) ?? 0,
    }));

  const influenceAnswers = answers.filter((answer) => answer.website_influence);
  const influenceCounts = new Map<string, number>();
  Object.keys(INFLUENCE_LABELS).forEach((value) => influenceCounts.set(value, 0));
  influenceAnswers.forEach((answer) => {
    const value = answer.website_influence!;
    influenceCounts.set(value, (influenceCounts.get(value) ?? 0) + 1);
  });

  const websiteInfluencePercentages = Array.from(influenceCounts.entries())
    .map(([value, count]) => ({
      name: INFLUENCE_LABELS[value] ?? value,
      count,
      value: percentage(count, influenceAnswers.length),
    }))
    .sort((a, b) => b.count - a.count);

  const websiteAssisted = influenceAnswers.filter(
    (answer) =>
      answer.website_influence === "decisive" ||
      answer.website_influence === "helped"
  ).length;
  const websiteVisited = answers.filter((answer) => answer.visited_website).length;

  // Klanttype-segmentatie
  const customerTypeCounts = new Map<string, number>();
  Object.keys(CUSTOMER_TYPE_LABELS).forEach((value) =>
    customerTypeCounts.set(value, 0)
  );
  answers.forEach((answer) => {
    if (answer.customer_type) {
      customerTypeCounts.set(
        answer.customer_type,
        (customerTypeCounts.get(answer.customer_type) ?? 0) + 1
      );
    }
  });
  const customerTypePercentages = Array.from(customerTypeCounts.entries())
    .map(([value, count]) => ({
      name: CUSTOMER_TYPE_LABELS[value] ?? value,
      count,
      value: percentage(count, answers.length),
    }))
    .sort((a, b) => b.count - a.count);

  const newCustomers = answers.filter((a) => a.customer_type === "new");
  // Aandeel nieuwe klanten dat door de website is aangetrokken of overtuigd
  const websiteDrivenNew = newCustomers.filter(
    (a) =>
      a.website_influence === "decisive" || a.website_influence === "helped"
  ).length;

  return {
    total: answers.length,
    today,
    thisMonth,
    newCustomerPercentage: percentage(newCustomers.length, answers.length),
    websiteVisitedPercentage: percentage(websiteVisited, answers.length),
    websiteAssistedPercentage: percentage(
      websiteAssisted,
      influenceAnswers.length
    ),
    websiteDrivenNewPercentage: percentage(
      websiteDrivenNew,
      newCustomers.length
    ),
    customerTypePercentages,
    sourcePercentages: countByField(
      newCustomers,
      "source",
      SOURCE_OPTIONS.map((option) => option.label)
    ),
    websiteInfluencePercentages,
    monthlyData,
    weeklyData,
  };
}
