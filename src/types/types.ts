import { GenericIcons } from "@/lib/genericIcons";
import { z } from "zod/v4";

export const builtinNameSchema = z.enum(
  Object.keys(GenericIcons) as [
    keyof typeof GenericIcons,
    ...Array<keyof typeof GenericIcons>,
  ],
);

export type BuiltinIcon = keyof typeof GenericIcons;

const iconSchema = z.discriminatedUnion("type", [
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

const subSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number().nonnegative().multipleOf(0.01),
  currencyCode: z.string().length(3),
  icon: iconSchema,
  url: z.url().optional(),
  notes: z.string().optional(),
  color: z.string(),
  startDate: z.iso.datetime(),
  cycle: z.enum(["month", "year", "other"]),
  categoryId: z.string(),
  status: z.enum(["active", "paused"]),
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
