import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/contexts/lang";
import type { Subscription } from "@/types/types";
import type { UseFormReturn } from "react-hook-form";
import { BillingCycleField } from "./BillingCycleField";
import { DatePicker } from "./DatePicker";

interface BillingSectionProps {
  form: UseFormReturn<Partial<Subscription>>;
}

export function BillingSection({ form }: BillingSectionProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="cycle"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{t.subscription.form.cycle.label}</FormLabel>
              <FormControl>
                <BillingCycleField {...field} value={field.value!} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>{t.subscription.form.date.start}</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(d) =>
                      field.onChange(d ? d.toLocaleDateString("en-CA") : null)
                    }
                    required={true}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t.subscription.form.date.end}</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(d) =>
                      field.onChange(d ? d.toLocaleDateString("en-CA") : null)
                    }
                    disabled={form.getValues("autoRenew")}
                  />
                </FormControl>
              </div>
              <FormMessage />
              {form.getValues("autoRenew") && (
                <p className="text-[0.8rem] text-muted-foreground mt-1">
                  {t.subscription.form.date.disabledNote}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="autoRenew"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between pr-2">
                <FormLabel>{t.subscription.form.autoRenew}</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    name={field.name}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    ref={field.ref}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
