import type { Translation } from "@/contexts/lang";
import { subSchema } from "@/types/types";

/**
 * Create form validation schema with internationalization support
 * Used for subscription form validation
 */
export default function makeFormSchema(t: Translation) {
  return subSchema.refine((d) => !d.endDate || d.endDate >= d.startDate, {
    path: ["endDate"],
    message: t.error.endAfter,
  });
}
