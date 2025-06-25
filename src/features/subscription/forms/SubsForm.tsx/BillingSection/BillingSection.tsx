import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useI18n } from "@/contexts/LangContext";
import type { Subscription } from "@/types/types";
import { parseISO } from "date-fns";
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
                    value={field.value ? parseISO(field.value) : null}
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
                    value={field.value ? parseISO(field.value) : null}
                    onChange={(d) =>
                      field.onChange(d ? d.toLocaleDateString("en-CA") : null)
                    }
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
