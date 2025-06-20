import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/contexts/LangContext";
import { forwardRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  id?: string;
  value: string;
  onChange: (color: string) => void;
  onBlur: () => void;
  name?: string;
}

export const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(
  ({ id, value, onChange, onBlur }, ref) => {
    const { t } = useI18n();
    const [color, setColor] = useState(value);

    const handleChange = (newColor: string) => {
      setColor(newColor);
      onChange(newColor);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            onBlur={onBlur}
            ref={ref}
            variant="ghost"
            className="flex items-center justify-between px-4 bg-neutral-100 h-10 w-full"
          >
            <span>{t.subscription.form.color.label}</span>
            <span
              className="w-8 h-8 rounded-full border-2 border-white"
              style={{ backgroundColor: color }}
            ></span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex justify-center">
          <div className="flex flex-col gap-2 items-center w-48 p-2">
            <HexColorPicker color={color} onChange={handleChange} />
            <Label className="sr-only" htmlFor="color">
              {t.subscription.form.color.input}
            </Label>
            <Input
              type="text"
              id="color"
              className="border rounded px-2 py-1 w-full text-center"
              value={color}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#([0-9a-fA-F]{3}){1,2}$/.test(val)) {
                  handleChange(val);
                } else {
                  setColor(val);
                }
              }}
              maxLength={7}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
