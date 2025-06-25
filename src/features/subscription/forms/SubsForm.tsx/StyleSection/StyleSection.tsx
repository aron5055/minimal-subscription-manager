import { FormItemWrapper } from "@/components/common/FormItemWrapper";
import { FormField } from "@/components/ui/form";
import { useI18n } from "@/contexts/LangContext";
import type { Subscription } from "@/types/types";
import type { UseFormReturn } from "react-hook-form";
import { CategoryPicker } from "./CategoryPicker";
import { ColorPicker } from "./ColorPicker";

interface StyleSectionProps {
  form: UseFormReturn<Partial<Subscription>>;
}

export function StyleSection({ form }: StyleSectionProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItemWrapper label={t.subscription.form.category.label} hideLabel>
            <CategoryPicker {...field} value={field.value!} />
          </FormItemWrapper>
        )}
      />

      <FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItemWrapper label={t.subscription.form.color.label} hideLabel>
            <ColorPicker {...field} value={field.value!} />
          </FormItemWrapper>
        )}
      />
    </div>
  );
}
