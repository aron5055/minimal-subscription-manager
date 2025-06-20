import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ReactNode } from "react";
import { Separator } from "../ui/separator";

interface DialogWrapperProps {
  trigger?: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DialogWrapper({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
}: DialogWrapperProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="
      p-0 w-[90vw] rounded-lg
      left-1/2 -translate-x-1/2
      top-[5svh] translate-y-0 
      sm:top-1/2 sm:-translate-y-1/2
      max-h-[90svh] overflow-y-auto flex flex-col
      "
      >
        <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <section className="flex-1 overflow-y-auto flex justify-center px-6">
          {children}
        </section>
        <Separator />
        {footer && (
          <DialogFooter className="shrink-0 px-6 py-4">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
