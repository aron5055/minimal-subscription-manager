import { today } from "@/lib";
import { generateSoftColor } from "@/lib/color";
import { GenericIcons } from "@/lib/icon";
import { nanoid } from "nanoid";
import { z } from "zod/v4";

export const builtinNameSchema = z.enum(
  Object.keys(GenericIcons) as [
    keyof typeof GenericIcons,
    ...Array<keyof typeof GenericIcons>,
  ],
);

export type BuiltinIcon = keyof typeof GenericIcons;

export const iconSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("favicon"), url: z.url() }),
  z.object({ type: z.literal("builtin"), name: builtinNameSchema }),
  z.object({ type: z.literal("text"), text: z.string() }),
  z.object({ type: z.literal("empty") }),
]);

export type Icon = z.infer<typeof iconSchema>;

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export const cycleSchema = z.object({
  num: z.int().positive(),
  type: z.enum(["day(s)", "month(s)", "year(s)"]),
});

export type CycleType = z.infer<typeof cycleSchema>;

export const subSchema = z.object({
  id: z.string().default(() => nanoid(10)),
  title: z.string().default(""),
  price: z.number().nonnegative().multipleOf(0.01).default(0.0),
  currencyCode: z.string().length(3).default("USD"),
  icon: iconSchema.default({ type: "empty" }),
  url: z.url().optional().or(z.literal("")).default(""),
  notes: z.string().default(""),
  color: z.string().default(generateSoftColor),
  startDate: z.iso.date().default(today),
  endDate: z.iso.date().nullable().default(null),
  cycle: cycleSchema.default({ num: 1, type: "month(s)" }),
  categoryId: z.string().default(""),
  autoRenew: z.boolean().default(true),
  status: z.enum(["active", "paused"]).default("active"),
});

export type Subscription = z.infer<typeof subSchema>;

const stateSchema = z.object({
  subs: z.array(subSchema),
  cats: z.record(z.string(), categorySchema),
});

export type State = z.infer<typeof stateSchema>;

export const exportBlobSchema = z.object({
  schema: z.number(),
  exportedAt: z.iso.datetime(),
  data: stateSchema,
});

export type ExportBlob = z.infer<typeof exportBlobSchema>;

export interface ExchangeRateData {
  date: string;
  base: string;
  rates: Record<string, number>;
}
