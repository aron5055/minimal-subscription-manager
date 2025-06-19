import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useI18n } from "@/contexts/LangContext";
import type { Icon, Subscription } from "@/types/types";
import makeFormSchema from "@/utils/makeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO } from "date-fns";
import { useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import AvatarPicker from "./AvatarPicker";
import BillingCycleField from "./BillingCycleField";
import CategoryPicker from "./CategoryPicker";
import ColorPicker from "./ColorPicker";
import CurrencyPicker from "./CurrencyPicker";
import DatePicker from "./DatePicker";
import PresetPicker from "./PresetPicker";

interface SubsFormProps {
  sub?: Subscription;
  onSubmit: SubmitHandler<Subscription>;
  formId?: string;
}

export default function SubsForm({
  sub,
  onSubmit,
  formId = "subscription-form",
}: SubsFormProps) {
  const { currency } = useCurrency();
  const { t } = useI18n();
  const schema = useMemo(() => makeFormSchema(currency, t), [currency, t]);
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

  const setIcon = (text: string) => {
    const icon = form.getValues("icon");
    if (icon?.type === "favicon" || icon?.type === "builtin") {
      return;
    }
    form.setValue("icon", { type: "text", text });
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto md:w-[90%]"
      >
        {/* 头部区域：图标和价格 */}
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {t.subscription.form.icon.label}
                  </FormLabel>
                  <FormControl>
                    <AvatarPicker
                      {...field}
                      value={field.value!}
                      clearIcon={clearIcon}
                    />
                  </FormControl>
                </FormItem>
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
                <FormItem className="flex-1 max-w-20">
                  <FormLabel className="sr-only">
                    {t.subscription.form.price}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0.00"
                      inputMode="decimal"
                      className="text-center text-lg font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currencyCode"
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormLabel className="sr-only">
                    {t.subscription.form.currency}
                  </FormLabel>
                  <FormControl>
                    <CurrencyPicker {...field} value={field.value!} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* 基本信息区域 */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.subscription.form.title}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    spellCheck={false}
                    onChange={(e) => {
                      form.setValue("title", e.target.value);
                      setIcon(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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

        {/* 计费信息区域 */}
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
                          field.onChange(
                            d ? d.toLocaleDateString("en-CA") : null,
                          )
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
                          field.onChange(
                            d ? d.toLocaleDateString("en-CA") : null,
                          )
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

        {/* 分类和样式区域 */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CategoryPicker {...field} value={field.value!} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  {t.subscription.form.color.label}
                </FormLabel>
                <FormControl>
                  <ColorPicker {...field} value={field.value!} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 备注区域 */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.subscription.form.notes}</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
