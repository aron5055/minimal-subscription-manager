import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useI18n } from "@/contexts/LangContext";

export default function BillingCycleField() {
  const { t } = useI18n();

  return (
    <ToggleGroup type="single">
      {t.subscription.form.cycle.group.map((cycle) => (
        <ToggleGroupItem
          key={cycle.value}
          value={cycle.value}
          className="px-4 py-2 rounded-lg text-base"
        >
          {cycle.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
