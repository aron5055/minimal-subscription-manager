import { FormItemWrapper } from "@/components/common/FormItemWrapper";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/contexts/lang";
import type { Icon, Subscription } from "@/types/types";
import type { UseFormReturn } from "react-hook-form";
import { AvatarPicker } from "./AvatarPicker";
import { CurrencyPicker } from "./CurrencyPicker";
import { PresetPicker } from "./PresetPicker";

interface IconPriceSectionProps {
  form: UseFormReturn<Partial<Subscription>>;
  clearIcon: () => Icon;
}

export function IconPriceSection({ form, clearIcon }: IconPriceSectionProps) {
  const { t } = useI18n();

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
        <PresetPicker />
      </div>

      {/* 价格和货币 */}
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
                  // 移除非数字和小数点的字符，保留数字格式
                  const numericValue = value.replace(/[^\d.]/g, "");
                  // 确保只有一个小数点
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
