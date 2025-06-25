import makeFormSchema from "@/lib/form";
import type { z } from "zod";

// 创建一个类型来推断 form schema
export type FormSchema = ReturnType<typeof makeFormSchema>;
export type FormData = z.infer<FormSchema>;
