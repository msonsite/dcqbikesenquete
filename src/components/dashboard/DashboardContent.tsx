"use client";

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { StatCard } from "./StatCard";
import { PercentageChart, BarChartCard } from "./Charts";
import { ExportButton } from "./ExportButton";
import type { DashboardStats, SurveyAnswer } from "@/types/survey";
import { withBasePath } from "@/lib/paths";

interface DashboardContentProps {
  stats: DashboardStats;
  answers: SurveyAnswer[];
}

export function DashboardContent({ stats, answers }: DashboardContentProps) {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = withBasePath("/dashboard/login");
  };

  return (
    <div className="min-h-screen bg-dcq-gray">
      <header className="border-b border-dcq-gray-border bg-dcq-black px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={withBasePath("/images/dcqbikeslogotransparent.png")}
              alt="DCQ Bikes"
              width={140}
              height={40}
              className="h-8 w-auto object-contain md:h-9"
            />
            <h1 className="font-heading text-lg font-semibold text-dcq-white md:text-xl">
              Enquête Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ExportButton answers={answers} />
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-dcq-white/80 transition-colors hover:bg-white/10"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {/* Kerncijfers */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard title="Totaal antwoorden" value={stats.total} />
          <StatCard title="Vandaag" value={stats.today} />
          <StatCard title="Deze maand" value={stats.thisMonth} />
          <StatCard
            title="Nieuwe klanten"
            value={`${stats.newCustomerPercentage}%`}
          />
          <StatCard
            title="Website bezocht"
            value={`${stats.websiteVisitedPercentage}%`}
            subtitle="Bekeek site vóór bezoek"
          />
          <StatCard
            title="Website → nieuwe klant"
            value={`${stats.websiteDrivenNewPercentage}%`}
            subtitle="Nieuwe klanten overtuigd door site"
          />
        </div>

        {/* Percentages */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PercentageChart
            title="Nieuwe vs. bestaande klanten"
            data={stats.customerTypePercentages}
          />
          <PercentageChart
            title="Kanaal nieuwe klanten"
            data={stats.sourcePercentages}
          />
          <PercentageChart
            title="Rol van dcqbikes.be"
            data={stats.websiteInfluencePercentages}
          />
        </div>

        {/* Grafieken */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarChartCard
            title="Antwoorden per maand"
            data={stats.monthlyData.map((d) => ({
              label: d.month,
              count: d.count,
              assisted: d.assisted,
            }))}
            showAssisted
          />
          <BarChartCard
            title="Antwoorden per week"
            data={stats.weeklyData.map((d) => ({
              label: d.week,
              count: d.count,
              assisted: d.assisted,
            }))}
            showAssisted
          />
        </div>
      </main>
    </div>
  );
}
