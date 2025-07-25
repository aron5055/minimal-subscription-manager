import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/contexts/lang";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";

interface DatePickerProps {
  id?: string;
  value: Date | null;
  onChange: (d: Date | null) => void;
  onBlur: () => void;
  required?: boolean;
  name?: string;
  disabled?: boolean;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    { id, value, onChange, onBlur, required = false, disabled = false },
    ref,
  ) => {
    const { t } = useI18n();
    const isPicked = Boolean(value);
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            ref={ref}
            variant="outline"
            className={cn(
              "w-1/2 justify-start text-left font-normal",
              !isPicked && "text-muted-foreground",
            )}
            onBlur={onBlur}
            aria-label={`${t.accessibility.btn.datePicker} ${isPicked ? value!.toLocaleDateString("en-CA") : ""}`}
            disabled={disabled}
          >
            <CalendarIcon />
            {isPicked ? value!.toLocaleDateString("en-CA") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto" align="start">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={(date: Date | undefined) => {
              onChange(date ?? null);
              setOpen(false);
            }}
            captionLayout="dropdown"
            required={required}
            initialFocus
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    );
  },
);
