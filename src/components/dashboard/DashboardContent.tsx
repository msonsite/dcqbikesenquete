"use client";

import { createClient } from "@/lib/supabase/client";
import { StatCard } from "./StatCard";
import { PercentageChart, BarChartCard } from "./Charts";
import { ExportButton } from "./ExportButton";
import type { DashboardStats, SurveyAnswer } from "@/types/survey";

interface DashboardContentProps {
  stats: DashboardStats;
  answers: SurveyAnswer[];
}

export function DashboardContent({ stats, answers }: DashboardContentProps) {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/dashboard/login";
  };

  return (
    <div className="min-h-screen bg-dcq-gray">
      <header className="border-b border-dcq-gray-border bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-dcq-red px-3 py-1">
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                DCQ Bikes
              </span>
            </div>
            <h1 className="text-xl font-bold text-dcq-black">Enquête Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <ExportButton answers={answers} />
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-dcq-gray-border px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {/* Kerncijfers */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard title="Totaal antwoorden" value={stats.total} />
          <StatCard title="Vandaag" value={stats.today} />
          <StatCard title="Deze maand" value={stats.thisMonth} />
        </div>

        {/* Percentages */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PercentageChart
            title="Percentage per bron"
            data={stats.sourcePercentages}
          />
          <PercentageChart
            title="Website bekeken vóór aankoop"
            data={stats.websitePercentages}
          />
        </div>

        {/* Grafieken */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarChartCard
            title="Antwoorden per maand"
            data={stats.monthlyData.map((d) => ({
              label: d.month,
              count: d.count,
            }))}
          />
          <BarChartCard
            title="Antwoorden per week"
            data={stats.weeklyData.map((d) => ({
              label: d.week,
              count: d.count,
            }))}
          />
        </div>
      </main>
    </div>
  );
}
