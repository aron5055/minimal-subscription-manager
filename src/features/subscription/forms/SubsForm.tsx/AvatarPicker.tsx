import { DialogWrapper } from "@/components/common/DialogWrapper";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/LangContext";
import { GenericIcons, renderIcon, type BuiltinIcon } from "@/lib/icon";
import type { Icon } from "@/types/types";
import { forwardRef, useState } from "react";

interface AvatarPickerProps {
  id?: string;
  value: Icon;
  onChange: (icon: Icon) => void;
  onBlur: () => void;
  name?: string;
  clearIcon: () => Icon;
}

export const AvatarPicker = forwardRef<HTMLButtonElement, AvatarPickerProps>(
  ({ id, value, onChange, onBlur, clearIcon }, ref) => {
    const [open, setOpen] = useState(false);
    const { t } = useI18n();

    const handleChangeIcon = (name: BuiltinIcon) => {
      onChange(name === "none" ? clearIcon() : { type: "builtin", name });
      setOpen(false);
    };

    const Trigger = (
      <Button
        id={id}
        ref={ref}
        variant="ghost"
        className="rounded-full size-20"
        onBlur={onBlur}
      >
        <Avatar
          key={value.type === "builtin" ? `bulitin-${value.name}` : value.type}
          className="size-20"
        >
          {renderIcon(value)}
        </Avatar>
      </Button>
    );

    const Footer = (
      <Button
        variant="destructive"
        className="w-full mb-3"
        onClick={() => handleChangeIcon("none")}
      >
        {t.subscription.form.icon.clear}
      </Button>
    );

    return (
      <DialogWrapper
        title={t.subscription.form.icon.label}
        description={t.subscription.form.icon.description}
        trigger={Trigger}
        footer={Footer}
        open={open}
        onOpenChange={setOpen}
      >
        <div className="grid grid-cols-3 gap-4 w-full mt-2">
          {Object.entries(GenericIcons).map(([name, Icon]) => (
            <Button
              key={name}
              variant="ghost"
              className="h-16 rounded-xl w-full [&_svg]:size-6 focus-visible:ring-2"
              onClick={() => handleChangeIcon(name as BuiltinIcon)}
            >
              <Icon />
            </Button>
          ))}
        </div>
      </DialogWrapper>
    );
  },
);
