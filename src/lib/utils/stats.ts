import type { SurveyAnswer, DashboardStats } from "@/types/survey";
import { SOURCE_OPTIONS } from "@/lib/constants";

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
  const weeklyMap = new Map<string, number>();

  answers.forEach((a) => {
    const date = new Date(a.created_at);
    const monthKey = formatMonthKey(date);
    monthlyMap.set(monthKey, (monthlyMap.get(monthKey) ?? 0) + 1);
    const weekKey = getWeekKey(date);
    weeklyMap.set(weekKey, (weeklyMap.get(weekKey) ?? 0) + 1);
  });

  const monthlyData = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([month, count]) => ({ month: formatMonthLabel(month), count }));

  const weeklyData = Array.from(weeklyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([week, count]) => ({ week, count }));

  return {
    total: answers.length,
    today,
    thisMonth,
    sourcePercentages: countByField(answers, "source", SOURCE_OPTIONS),
    websitePercentages: countByField(answers, "visited_website"),
    monthlyData,
    weeklyData,
  };
}
