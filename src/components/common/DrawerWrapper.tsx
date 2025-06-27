import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

interface DrawerWrapperProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode; // 使 footer 可选
  title: string;
  description: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DrawerWrapper({
  children,
  trigger,
  footer,
  title,
  description,
  open,
  onOpenChange,
}: DrawerWrapperProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader className="pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-center flex-1">{title}</DrawerTitle>
              {
                <DrawerClose asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X size={16} />
                    <span className="sr-only">Close</span>
                  </Button>
                </DrawerClose>
              }
            </div>
            <DrawerDescription className="sr-only">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          {children}
          {footer && <DrawerFooter className="pt-2">{footer}</DrawerFooter>}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
