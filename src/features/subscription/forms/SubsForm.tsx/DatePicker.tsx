import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/contexts/LangContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { forwardRef } from "react";

interface DatePickerProps {
  id?: string;
  value: Date | null;
  onChange: (d: Date | null) => void;
  onBlur: () => void;
  required?: boolean;
  name?: string;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ id, value, onChange, onBlur, required = false }, ref) => {
    const isPicked = Boolean(value);
    const { t } = useI18n();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            ref={ref}
            variant="outline"
            className={cn(
              "w-2/3 justify-start text-left font-normal",
              !isPicked && "text-muted-foreground",
            )}
            onBlur={onBlur}
          >
            <CalendarIcon />
            {isPicked ? format(value!, "P") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto" align="start">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={(date: Date | undefined) => onChange(date ?? null)}
            captionLayout="dropdown"
            required={required}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);
