import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/lang";
import { useTheme } from "@/contexts/theme";
import { Check, Palette } from "lucide-react";

export function ThemeMenu() {
  const { t } = useI18n();
  const { theme, setTheme, enableBackgroundColor, setEnableBackgroundColor } =
    useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Palette />
        {t.settings.color.label}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between"
        >
          {t.settings.color.light}
          {theme === "light" && <Check size={16} />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between"
        >
          {t.settings.color.dark}
          {theme === "dark" && <Check size={16} />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setEnableBackgroundColor(!enableBackgroundColor)}
          className="flex items-center justify-between"
        >
          {t.settings.color.background}
          {enableBackgroundColor && <Check size={16} />}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
