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

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAllCats } from "@/contexts/SubsContext";
import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";

interface CategoryPickerProps {
  value: string;
  onChange: (id: string) => void;
}
export default function CategoryPicker({
  value,
  onChange,
}: CategoryPickerProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const cats = useAllCats();
  const current = cats.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="categories"
          variant="outline"
          className="w-full justify-start h-10"
        >
          {current === undefined ? (
            <span className="text-muted-foreground">选择分类</span>
          ) : (
            <Badge variant="outline" className="max-w-[6rem] truncate">
              {current.name}
            </Badge>
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
          <CommandInput placeholder="搜索分类…" />
          <ScrollArea className="max-h-60">
            <CommandList>
              {cats.map((cat) => (
                <CommandItem key={cat.id} className="gap-2">
                  <Checkbox />
                  <span>{cat.name}</span>
                </CommandItem>
              ))}
            </CommandList>
          </ScrollArea>
          <div className="border-t p-2">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setOpen(false);
                // 打开全量「管理分类」Dialog / 页面
              }}
            >
              管理分类…
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
