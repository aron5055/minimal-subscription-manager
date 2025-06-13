import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/contexts/LangContext";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const { t } = useI18n();
  const [color, setColor] = useState(value || "#ffffff");

  const handleChange = (newColor: string) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-between px-4 bg-neutral-100 h-10"
        >
          <span>{t.subscription.form.color}</span>
          <span
            className="w-8 h-8 rounded-full border-2 border-white"
            style={{ backgroundColor: color }}
          ></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex justify-center">
        <div className="flex flex-col gap-2 items-center w-48 p-2">
          <HexColorPicker color={color} onChange={handleChange} />
          <input
            type="text"
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
}
