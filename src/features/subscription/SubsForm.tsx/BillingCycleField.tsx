import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/contexts/LangContext";
import type { CycleType } from "@/types/types";
import { forwardRef } from "react";

interface BillingCycleFieldProps {
  id?: string;
  name?: string;
  value: CycleType;
  onChange: (c: CycleType) => void;
  onBlur: () => void;
}

const BillingCycleField = forwardRef<HTMLInputElement, BillingCycleFieldProps>(
  ({ id, value, onChange, onBlur }, ref) => {
    const { t } = useI18n();

    return (
      <div className="flex items-center w-1/2 gap-2">
        <Input
          id={id}
          ref={ref}
          type="number"
          min={1}
          step={1}
          value={value.num}
          onChange={(e) =>
            onChange({ ...value, num: parseInt(e.target.value, 10) })
          }
          onBlur={onBlur}
        />
        <Select
          value={value.type}
          onValueChange={(type: CycleType["type"]) =>
            onChange({ ...value, type })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {t.subscription.form.cycle.type.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
);

BillingCycleField.displayName = "BillingCycleField";
export default BillingCycleField;
