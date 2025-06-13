import codes from "@/assets/currencyCodes.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/contexts/LangContext";
import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";

export default function CurrencyPicker() {
  const { t } = useI18n();
  const [currency, setCurrency] = useState(t.subscription.form.currencyCode);

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-1/3 justify-center flex relative items-center">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        <SelectGroup>
          <SelectLabel>Currencies</SelectLabel>
          {codes.map((code) => (
            <SelectItem key={code} value={code}>
              {`${getSymbolFromCurrency(code)} ${code}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
