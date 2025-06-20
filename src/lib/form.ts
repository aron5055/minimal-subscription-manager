import type { Translation } from "@/contexts/LangContext";
import { subSchema } from "@/types/types";
import { z } from "zod/v4";

/**
 * Create form validation schema with internationalization support
 * Used for subscription form validation
 */
export default function makeFormSchema(
  defaultCurrency: string,
  t: Translation,
) {
  const today = new Date().toLocaleDateString("en-CA");

  return z
    .object({
      ...subSchema.shape,
      currencyCode: z.string().length(3).default(defaultCurrency),
      startDate: z.iso.date().default(today),
    })
    .refine((d) => !d.endDate || d.endDate >= d.startDate, {
      path: ["endDate"],
      message: t.error.endAfter,
    });
}
