import DialogWrapper from "@/components/DialogWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/contexts/LangContext";
import type { BuiltinIcon } from "@/lib/genericIcons";
import { getFaviconUrl } from "@/lib/utils";
import type { Icon } from "@/types/types";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import AvatarPicker from "./AvatarPicker";
import BillingCycleField from "./BillingCycleField";
import CategoryPicker from "./CategoryPicker";
import ColorPicker from "./ColorPicker";
import CurrencyPicker from "./CurrencyPicker";
import { DatePickerDemo } from "./DatePicker";
import PresetPicker from "./PresetPicker";
import UrlField from "./UrlField";

function getTextIcon(text: string): Icon {
  return text.trim() ? { type: "text", text } : { type: "empty" };
}

type FormType = {
  title: string;
  url: string;
  currency: string;
  price: number;
  notes: string;
  date: Date;
};

export default function SubsDialog() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState<Icon>({ type: "empty" });
  const [state, setState] = useState({
    title: "",
    url: "",
  });
  const [category, setCategory] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (icon.type === "empty" || icon.type === "text") {
      setIcon(getTextIcon(value));
    }
  };

  const handleChangeIcon = (name: BuiltinIcon) => {
    if (name === "none") {
      setIcon(getTextIcon(title));
    } else {
      setIcon({ type: "builtin", name });
    }
  };

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      setIcon({ type: "favicon", url: getFaviconUrl(url) });
    } else {
      setIcon(getTextIcon(title));
    }
  };

  const Trigger = (
    <Button aria-label={t.subscription.label}>
      <IoAdd />
    </Button>
  );

  const Footer = <Button>{t.subscription.form.submit}</Button>;

  return (
    <DialogWrapper
      title={t.subscription.label}
      description={t.subscription.description}
      trigger={Trigger}
      footer={Footer}
    >
      <div className="flex flex-col gap-4 w-[80%]">
        <div className="flex flex-col gap-3 items-center">
          <AvatarPicker icon={icon} changeIcon={handleChangeIcon} />
          <PresetPicker />
          <CurrencyPicker />
          <Label htmlFor="fee" className="sr-only">
            {t.subscription.form.fee}
          </Label>
          <Input id="fee" className="w-1/3 text-center" placeholder="0.00" />
        </div>
        <Label htmlFor="title">{t.subscription.form.title}</Label>
        <Input
          id="title"
          value={title}
          onChange={(evt) => handleTitleChange(evt.target.value)}
          spellCheck={false}
        />
        <UrlField
          url={url}
          setUrl={setUrl}
          handleCheckedChange={handleCheckedChange}
        />

        <Label htmlFor="notes">{t.subscription.form.notes}</Label>
        <Textarea id="notes" />
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">
            {t.subscription.form.cycle.label}
          </span>
          <BillingCycleField />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">
            {t.subscription.form.date}
          </span>
          <DatePickerDemo />
        </div>
        <CategoryPicker />
        <ColorPicker onChange={(color) => {}} />
      </div>
    </DialogWrapper>
  );
}
