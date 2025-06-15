import DialogWrapper from "@/components/DialogWrapper";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/LangContext";
import { GenericIcons, type BuiltinIcon } from "@/lib/genericIcons";
import { renderIcon } from "@/lib/renderIcon";
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

  const Trigger = (
    <Avatar
      key={icon.type === "builtin" ? `bulitin-${icon.name}` : icon.type}
      className="size-16"
    >
      {renderIcon(icon)}
    </Avatar>
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
      <div className="grid grid-cols-3 gap-4 w-full">
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
}
