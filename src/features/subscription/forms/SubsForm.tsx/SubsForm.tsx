import { FormItemWrapper } from "@/components/common/FormItemWrapper";
import { Form, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/contexts/lang";
import makeFormSchema from "@/lib/form";
import type { Icon, Subscription } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { BasicInfoSection } from "./BasicInfoSection/BasicInfoSection";
import { BillingSection } from "./BillingSection/BillingSection";
import { IconPriceSection } from "./IconPriceSection/IconPriceSection";
import { StyleSection } from "./StyleSection/StyleSection";
import { useCurrency } from "@/contexts/currency";

interface SubsFormProps {
  sub?: Subscription;
  onSubmit: SubmitHandler<Subscription>;
  formId?: string;
}

export function SubsForm({
  sub,
  onSubmit,
  formId = "subscription-form",
}: SubsFormProps) {
  const { t } = useI18n();
  const {currency} = useCurrency();
  const schema = useMemo(() => makeFormSchema(t, currency), [t, currency]);
  const defaults = useMemo(() => schema.parse(sub ?? {}), [schema, sub]);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const clearIcon: () => Icon = () => {
    const text = form.getValues("title");
    if (text) {
      return { type: "text", text };
    } else {
      return { type: "empty" };
    }
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto md:w-[90%]"
      >
        <IconPriceSection form={form} clearIcon={clearIcon} />

        <BasicInfoSection form={form} clearIcon={clearIcon} />

        <BillingSection form={form} />

        <StyleSection form={form} />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItemWrapper label={t.subscription.form.notes}>
              <Textarea {...field} className="min-h-20" />
            </FormItemWrapper>
          )}
        />
      </form>
    </Form>
  );
}
