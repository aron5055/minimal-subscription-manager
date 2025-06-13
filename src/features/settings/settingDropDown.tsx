import codes from "@/assets/currencyCodes.json";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/LangContext";
import getSymbolFromCurrency from "currency-symbol-map";
import { DollarSign, Download, Globe, Settings, Upload } from "lucide-react";

export default function SettingDropDown() {
  const { t, setLang } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Settings size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">
          {t.settings.label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Upload />
          {t.settings.importData}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download />
          {t.settings.exportData}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <DollarSign />
            {t.settings.defaultCurrency}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <Command>
                <CommandInput />
                <CommandList>
                  {codes.map((code) => (
                    <CommandItem key={code} value={code}>
                      {`(${getSymbolFromCurrency(code)}) ${code}`}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Globe />
            {t.settings.lang.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setLang("zh")}>
                {t.settings.lang.cn}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")}>
                {t.settings.lang.eng}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
