import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/contexts/LangContext";
import { useFavicon } from "@/hooks/useFavicon";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import BillingCycleField from "./BillingCycleField";
import ColorPicker from "./ColorPicker";
import CurrencyPicker from "./CurrencyPicker";
import { DatePickerDemo } from "./DatePicker";
import PresetPicker from "./PresetPicker";

export default function SubsDialog() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const favicon = useFavicon(url);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label={t.subscription.label}>
          <IoAdd />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t.subscription.label}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t.subscription.description}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 items-center">
            <Avatar className="size-16">
              <AvatarImage src={favicon} alt="icon" />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
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
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            spellCheck={false}
          />
          <Label htmlFor="url">{t.subscription.form.url.label}</Label>
          <Input
            id="url"
            value={url}
            onChange={(evt) => setUrl(evt.target.value)}
            placeholder={t.subscription.form.url.placeholder}
          />
          <Label htmlFor="notes">{t.subscription.form.notes}</Label>
          <Input id="notes" />
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
        </div>

        <ColorPicker onChange={(color) => {}} />
        <Separator />
        <DialogFooter>
          <Button>{t.subscription.form.submit}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
