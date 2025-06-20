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
import { Separator } from "@/components/ui/separator";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useI18n } from "@/contexts/LangContext";
import { useSubscription } from "@/contexts/SubsContext";
import { exportData } from "@/lib/data";
import { exportBlobSchema } from "@/types/types";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  Check,
  DollarSign,
  Download,
  Globe,
  Settings,
  Upload,
} from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { ResetMenu } from "./ResetMenu";

export default function SettingDropDown() {
  const { t, lang, setLang } = useI18n();
  const { currency, setCurrency } = useCurrency();
  const [state, dispatch] = useSubscription();
  const fileRef = useRef<HTMLInputElement>(null);

  const importData = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = exportBlobSchema.parse(JSON.parse(text));
      dispatch({ type: "HYDRATE_STATE", payload: parsed.data });
      // TODO: better prompts
      toast.success("success");
    } catch (e) {
      // TODO: better prompts
      toast.error("error");
    } finally {
      fileRef.current!.value = "";
    }
  };

  return (
    <>
      {/**TODO: abstraction */}
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Settings size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">
            {t.settings.label}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => fileRef.current?.click()}>
            <Download />
            {t.settings.importData}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportData(state)}>
            <Upload />
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
                      <CommandItem
                        key={code}
                        value={code}
                        onSelect={() => setCurrency(code)}
                        className="flex items-center justify-between"
                      >
                        <span>{`(${getSymbolFromCurrency(code)}) ${code}`}</span>
                        {currency === code && <Check size={16} />}
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
          <Separator />
          <DropdownMenuItem asChild>
            <ResetMenu />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="file"
        hidden
        ref={fileRef}
        accept="application/json"
        onChange={importData}
      />
    </>
  );
}
