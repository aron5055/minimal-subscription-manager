import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/contexts/LangContext";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useAllCats } from "@/contexts/SubsContext";
import { ChevronDown, Pencil, X } from "lucide-react";
import { forwardRef, useState } from "react";
import { CategoryManage } from "./CategoryManage";

interface CategoryPickerProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (id: string) => void;
  onBlur: () => void;
}

export const CategoryPicker = forwardRef<
  HTMLButtonElement,
  CategoryPickerProps
>(({ id, value, onChange }, ref) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const categories = useAllCats();
  const current = categories.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          ref={ref}
          variant="outline"
          className="w-full justify-start h-10"
        >
          {current === undefined ? (
            <span className="text-muted-foreground">
              {t.subscription.form.category.label}
            </span>
          ) : (
            <span>{current.name}</span>
          )}
          {open ? (
            <ChevronDown className="ml-auto size-4 shrink-0" />
          ) : (
            <Pencil className="ml-auto size-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput />
          <ScrollArea className="max-h-60">
            <CommandList>
              {categories.map((cat) => (
                <CommandItem
                  key={cat.id}
                  value={cat.name}
                  className="gap-2"
                  onSelect={(currentValue) => {
                    const selectedCat = categories.find(
                      (c) => c.name === currentValue,
                    );
                    if (selectedCat) {
                      onChange(
                        selectedCat.id === current?.id ? "" : selectedCat.id,
                      );
                    }
                    setOpen(false);
                  }}
                >
                  {cat.name}
                </CommandItem>
              ))}
            </CommandList>
          </ScrollArea>
          <div className="border-t p-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                <X />
                {t.subscription.form.category.clear}
              </Button>
              <CategoryManage />
            </div>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
