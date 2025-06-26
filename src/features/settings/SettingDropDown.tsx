import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/contexts/lang";
import { Settings } from "lucide-react";
import { CurrencyMenu } from "./CurrencyMenu";
import { ImportExportMenu } from "./ImportExportMenu";
import { LanguageMenu } from "./LanguageMenu";
import { ResetMenu } from "./ResetMenu";
import { ThemeMenu } from "./ThemeMenu";

export default function SettingDropDown() {
  const { t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus:outline-none p-2 rounded-lg hover:bg-accent transition-colors duration-150"
        aria-label={t.settings.label}
      >
        <Settings
          size={24}
          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">
          {t.settings.label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ImportExportMenu />

        <CurrencyMenu />

        <LanguageMenu />

        <ThemeMenu />

        <Separator />
        <DropdownMenuItem asChild>
          <ResetMenu />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
