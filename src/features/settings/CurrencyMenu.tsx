import codes from "@/assets/currencyCodes.json";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/contexts/currency";
import { useI18n } from "@/contexts/lang";
import getSymbolFromCurrency from "currency-symbol-map";
import { Check, DollarSign } from "lucide-react";

export function CurrencyMenu() {
  const { t } = useI18n();
  const { currency, setCurrency } = useCurrency();

  return (
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
  );
}
