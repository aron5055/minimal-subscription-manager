import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ReactNode } from "react";

interface FormItemWrapperProps {
  children: ReactNode;
  label: string;
  hideLabel?: boolean;
  className?: string;
}

export function FormItemWrapper({
  children,
  label,
  hideLabel,
  className,
}: FormItemWrapperProps) {
  const labelClassName = hideLabel ? "sr-only" : "";
  return (
    <FormItem className={className}>
      <FormLabel className={labelClassName}>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
}
