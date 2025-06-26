import { DialogWrapper } from "@/components/common/DialogWrapper";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/lang";

export function PresetPicker() {
  const { t } = useI18n();

  return (
    <DialogWrapper
      title={t.subscription.form.preset.label}
      description={t.subscription.form.preset.description}
      trigger={
        <Button variant="outline" className="w-auto">
          {t.subscription.form.preset.label}
        </Button>
      }
    >
      <div></div>
    </DialogWrapper>
  );
}
