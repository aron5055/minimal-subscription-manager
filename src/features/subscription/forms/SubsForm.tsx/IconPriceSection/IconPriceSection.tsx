import { FormItemWrapper } from "@/components/common/FormItemWrapper";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/contexts/lang";
import type { Icon, Subscription } from "@/types/types";
import type { UseFormReturn } from "react-hook-form";
import { AvatarPicker } from "./AvatarPicker";
import { CurrencyPicker } from "./CurrencyPicker";
import { PresetsPicker } from "./PresetsPicker";

interface IconPriceSectionProps {
  form: UseFormReturn<Partial<Subscription>>;
  clearIcon: () => Icon;
}

export function IconPriceSection({ form, clearIcon }: IconPriceSectionProps) {
  const { t } = useI18n();

  const handlePresetSelect = (preset: Subscription) => {
    const presetData = {
      ...preset,
      startDate: new Date().toISOString().split("T")[0],
    };

    form.reset(presetData);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3">
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItemWrapper
              label={t.subscription.form.icon.label}
              hideLabel
              className="w-20"
            >
              <AvatarPicker
                {...field}
                value={field.value!}
                clearIcon={clearIcon}
              />
            </FormItemWrapper>
          )}
        />
        <PresetsPicker onSelectPreset={handlePresetSelect} />
      </div>

      {/* Price and Currency */}
      <div className="flex items-center justify-center gap-2">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItemWrapper
              label={t.subscription.form.price}
              hideLabel
              className="flex-1 max-w-20"
            >
              <Input
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  // remove all non-numeric characters except for the decimal point
                  const numericValue = value.replace(/[^\d.]/g, "");
                  // only allow one decimal point
                  const parts = numericValue.split(".");
                  const formattedValue =
                    parts.length > 2
                      ? parts[0] + "." + parts.slice(1).join("")
                      : numericValue;

                  field.onChange(
                    formattedValue ? parseFloat(formattedValue) : 0,
                  );
                }}
                placeholder="0.00"
                inputMode="decimal"
                className="text-center text-lg font-medium"
              />
            </FormItemWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="currencyCode"
          render={({ field }) => (
            <FormItemWrapper
              label={t.subscription.form.currency}
              hideLabel
              className="w-20"
            >
              <CurrencyPicker {...field} value={field.value!} />
            </FormItemWrapper>
          )}
        />
      </div>
    </div>
  );
}
