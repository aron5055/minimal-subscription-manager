import presetsData from "@/assets/presets.json";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "@/contexts/lang";
import type { Subscription } from "@/types/types";
import { useState } from "react";
import { PresetCard } from "./PresetCard";

interface PresetsPickerProps {
  onSelectPreset: (preset: Subscription) => void;
  trigger?: React.ReactNode;
}

export function PresetsPicker({ onSelectPreset, trigger }: PresetsPickerProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const presets = presetsData.map((preset) => ({
    ...preset,
    startDate: new Date().toISOString().split("T")[0],
  })) as Subscription[];

  const handlePresetSelect = (preset: Subscription) => {
    onSelectPreset(preset);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-auto">
            {t.subscription.form.preset.label}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{t.subscription.form.preset.description}</DialogTitle>
          <DialogDescription className="sr-only">
            {t.subscription.form.preset.description}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {presets.map((preset) => (
              <PresetCard
                key={preset.id}
                sub={preset}
                onClick={() => handlePresetSelect(preset)}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
