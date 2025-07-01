import type { Translation } from "@/contexts/lang";
import { subSchema } from "@/types/types";
import { z } from "zod/v4";

/**
 * Create form validation schema with internationalization support
 * Used for subscription form validation
 */
export default function makeFormSchema(t: Translation, currency: string) {
  return subSchema
    .extend({
      currencyCode: z.string().length(3).default(currency),
    })
    .refine((d) => !d.endDate || d.endDate >= d.startDate, {
      path: ["endDate"],
      message: t.error.endAfter,
    });
}
