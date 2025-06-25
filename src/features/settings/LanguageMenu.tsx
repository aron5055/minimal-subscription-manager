import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/LangContext";
import { Check, Globe } from "lucide-react";

export function LanguageMenu() {
  const { t, lang, setLang } = useI18n();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Globe />
        {t.settings.lang.label}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={() => setLang("zh")}
            className="flex items-center justify-between"
          >
            <span>{t.settings.lang.cn}</span>
            {lang === "zh" && <Check size={16} />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLang("en")}
            className="flex items-center justify-between"
          >
            <span>{t.settings.lang.eng}</span>
            {lang === "en" && <Check size={16} />}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
