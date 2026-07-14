"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { computeDashboardStats } from "@/lib/utils/stats";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { DashboardStats, SurveyAnswer } from "@/types/survey";

export default function DashboardPage() {
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("survey_answers")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as SurveyAnswer[];
    setAnswers(rows);
    setStats(computeDashboardStats(rows));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dcq-gray">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dcq-gray px-6">
        <ErrorMessage message={`Fout bij ophalen van data: ${error}`} onRetry={loadData} />
      </div>
    );
  }

  if (!stats) return null;

  return <DashboardContent stats={stats} answers={answers} />;
}
