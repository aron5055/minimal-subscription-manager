import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useI18n } from "@/contexts/LangContext";

export default function PresetPicker() {
  const { t } = useI18n();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/3">{t.subscription.form.preset.label}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.subscription.form.preset.label}</DialogTitle>
          <DialogDescription>
            {t.subscription.form.preset.description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
