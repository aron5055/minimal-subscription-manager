import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/lang";
import { type Lang } from "@/lib/i18n";
import { Check, Globe } from "lucide-react";

// Language key mapping for translations
const LANGUAGE_KEY_MAP: Record<Lang, keyof typeof import("@/assets/i18n/en.json")["settings"]["lang"]> = {
  en: "eng",
  zh: "cn", 
  jp: "jp"
};

// Available languages for the application
const AVAILABLE_LANGUAGES: Lang[] = ["en", "zh", "jp"];

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
          {AVAILABLE_LANGUAGES.map((availableLang) => {
            const langKey = LANGUAGE_KEY_MAP[availableLang];
            return (
              <DropdownMenuItem
                key={availableLang}
                onClick={() => setLang(availableLang)}
                className="flex items-center justify-between"
              >
                <span>
                  {t.settings.lang[langKey]}
                </span>
                {lang === availableLang && <Check size={16} />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
