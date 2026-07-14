"use client";

import { exportToCsv } from "@/lib/utils/csv";
import type { SurveyAnswer } from "@/types/survey";

interface ExportButtonProps {
  answers: SurveyAnswer[];
}

export function ExportButton({ answers }: ExportButtonProps) {
  const handleExport = () => {
    const date = new Date().toISOString().slice(0, 10);
    exportToCsv(answers, `dcq-enquete-${date}.csv`);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={answers.length === 0}
      className="rounded-xl bg-dcq-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Exporteer CSV ({answers.length})
    </button>
  );
}
