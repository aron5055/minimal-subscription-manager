import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface DrawerWrapperProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  footer: React.ReactNode;
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
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader className="pb-4">
            <DrawerTitle className="text-center">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter className="pt-2">{footer}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
