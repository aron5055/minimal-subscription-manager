import type { State } from "@/types/types";

/**
 * Export application state data as JSON file
 * Downloads the data with timestamp in filename
 */
export function exportData(state: State): void {
  const blob = new Blob(
    [
      JSON.stringify(
        { schema: 1, exportedAt: new Date().toISOString(), data: state },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );

  const href = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href,
    download: `sub-${Date.now()}.json`,
  });
  a.click();
  URL.revokeObjectURL(href);
}
