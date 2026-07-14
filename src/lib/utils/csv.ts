import type { SurveyAnswer } from "@/types/survey";

/** Exporteer enquête-antwoorden als CSV-bestand (client-side download) */
export function exportToCsv(answers: SurveyAnswer[], filename = "dcq-enquete.csv") {
  const headers = ["id", "created_at", "source", "visited_website", "purchase_reason"];
  const rows = answers.map((a) =>
    [
      a.id,
      a.created_at,
      `"${a.source.replace(/"/g, '""')}"`,
      a.visited_website ? "Ja" : "Nee",
      a.purchase_reason ? `"${a.purchase_reason.replace(/"/g, '""')}"` : "",
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
