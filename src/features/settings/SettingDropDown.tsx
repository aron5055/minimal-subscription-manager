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
import { useCurrency } from "@/contexts/CurrencyContext";
import { useI18n } from "@/contexts/LangContext";
import { useSubscription } from "@/contexts/SubsContext";
import { exportData } from "@/lib/utils";
import { exportBlobSchema } from "@/types/types";
import getSymbolFromCurrency from "currency-symbol-map";
import { DollarSign, Download, Globe, Settings, Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function SettingDropDown() {
  const { t, setLang } = useI18n();
  const { setCurrency } = useCurrency();
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
                      >
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
