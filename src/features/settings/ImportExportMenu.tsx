import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/LangContext";
import { useSubscription } from "@/contexts/SubsContext";
import { exportBlobSchema, type State } from "@/types/types";
import { Download, Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export function ImportExportMenu() {
  const { t } = useI18n();
  const [state, dispatch] = useSubscription();
  const fileRef = useRef<HTMLInputElement>(null);

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

  const importData = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = exportBlobSchema.parse(JSON.parse(text));
      dispatch({ type: "HYDRATE_STATE", payload: parsed.data });
      // TODO: better prompts
      toast.success("success");
    } catch (e) {
      // TODO: better prompts
      toast.error("error");
    } finally {
      fileRef.current!.value = "";
    }
  };

  return (
    <>
      <DropdownMenuItem onClick={() => fileRef.current?.click()}>
        <Download />
        {t.settings.importData}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => exportData(state)}>
        <Upload />
        {t.settings.exportData}
      </DropdownMenuItem>

      <input
        type="file"
        hidden
        ref={fileRef}
        accept="application/json"
        onChange={importData}
      />
    </>
  );
}
