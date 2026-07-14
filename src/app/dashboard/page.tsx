import { createClient } from "@/lib/supabase/server";
import { computeDashboardStats } from "@/lib/utils/stats";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import type { SurveyAnswer } from "@/types/survey";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("survey_answers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dcq-gray">
        <p className="text-lg text-dcq-red">
          Fout bij ophalen van data: {error.message}
        </p>
      </div>
    );
  }

  const answers = (data ?? []) as SurveyAnswer[];
  const stats = computeDashboardStats(answers);

  return <DashboardContent stats={stats} answers={answers} />;
}
