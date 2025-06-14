import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/contexts/LangContext";
import { GenericIcons, type BuiltinIcon } from "@/lib/genericIcons";
import { renderIcon } from "@/lib/renderIcon";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/types";
import { useState } from "react";
interface AvatarPickerProps {
  icon: Icon;
  changeIcon: (icon: BuiltinIcon) => void;
}

export default function AvatarPicker({ icon, changeIcon }: AvatarPickerProps) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const handleChangeIcon = (name: BuiltinIcon) => {
    changeIcon(name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Avatar
          key={icon.type === "builtin" ? `bulitin-${icon.name}` : icon.type}
          className="size-16"
        >
          {renderIcon(icon)}
        </Avatar>
      </DialogTrigger>
      <DialogContent
        className="
        p-0 w-[90vw] rounded-lg
        left-1/2 -translate-x-1/2
        top-[5svh] translate-y-0 
        sm:top-1/2 sm:-translate-y-1/2
        max-h-[90svh] overflow-y-auto flex flex-col
        "
      >
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="text-center">
            {t.subscription.form.icon.label}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t.subscription.form.icon.description}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <section className="px-6 pt-2 overflow-y-auto max-h-[80vh] flex-1">
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(GenericIcons).map(([name, Icon]) => (
              <Button
                key={name}
                variant="ghost"
                className={cn(
                  "h-16 rounded-xl w-full [&_svg]:size-6",
                  "focus-visible:ring-2",
                )}
                onClick={() => handleChangeIcon(name as BuiltinIcon)}
              >
                <Icon />
              </Button>
            ))}
          </div>
        </section>
        <Separator />
        <DialogFooter className="shrink-0 py-2 px-2">
          <Button
            variant="destructive"
            className="w-full mb-3"
            onClick={() => {
              changeIcon("none");
              setOpen(false);
            }}
          >
            {t.subscription.form.icon.clear}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
