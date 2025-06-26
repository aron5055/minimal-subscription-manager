import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/lang";
import { useSubscription } from "@/contexts/subscription";
import { exportBlobSchema, type State } from "@/types/types";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";

export function ImportExportMenu() {
  const { t } = useI18n();
  const { state, dispatch } = useSubscription();

  function exportData(state: State): void {
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

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const parsed = exportBlobSchema.parse(JSON.parse(text));
        dispatch({ type: "HYDRATE_STATE", payload: parsed.data });
        toast.success(t.settings.importSuccess as string);
      } catch (error) {
        toast.error(t.settings.importError as string);
        console.error("Import error:", error);
      }
    };

    input.click();
  };

  return (
    <>
      <DropdownMenuItem onClick={importData}>
        <Upload />
        {t.settings.importData}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => exportData(state)}>
        <Download />
        {t.settings.exportData}
      </DropdownMenuItem>
    </>
  );
}
