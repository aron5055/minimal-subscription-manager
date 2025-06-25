import { FormItemWrapper } from "@/components/common/FormItemWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/contexts/LangContext";
import type { Icon, Subscription } from "@/types/types";
import type { UseFormReturn } from "react-hook-form";

interface BasicInfoSectionProps {
  form: UseFormReturn<Partial<Subscription>>;
  clearIcon: () => Icon;
}

export function BasicInfoSection({ form, clearIcon }: BasicInfoSectionProps) {
  const { t } = useI18n();

  const setIcon = (text: string) => {
    const icon = form.getValues("icon");
    if (icon?.type === "favicon" || icon?.type === "builtin") {
      return;
    }
    form.setValue("icon", { type: "text", text });
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItemWrapper label={t.subscription.form.title} hideLabel={false}>
            <Input
              {...field}
              spellCheck={false}
              onChange={(e) => {
                form.setValue("title", e.target.value);
                setIcon(e.target.value);
              }}
            />
          </FormItemWrapper>
        )}
      />

      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.subscription.form.url.label}</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl>
                <Input
                  {...field}
                  placeholder={t.subscription.form.url.placeholder}
                  className="flex-1"
                />
              </FormControl>
              <Checkbox
                name="get-favicon"
                onCheckedChange={(checked) => {
                  if (checked) {
                    form.setValue("icon", {
                      type: "favicon",
                      url: field.value ?? "",
                    });
                  } else {
                    form.setValue("icon", clearIcon());
                  }
                }}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
