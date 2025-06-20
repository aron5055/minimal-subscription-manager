import codes from "@/assets/currencyCodes.json";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/contexts/LangContext";
import getSymbolFromCurrency from "currency-symbol-map";
import { ChevronDown, Search } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

interface CurrencyPickerProps {
  id?: string;
  value: string;
  onChange: (c: string) => void;
  onBlur: () => void;
  name?: string;
}

export const CurrencyPicker = forwardRef<
  HTMLButtonElement,
  CurrencyPickerProps
>(({ id, value, onChange, onBlur }, ref) => {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCodes = useMemo(() => {
    if (!searchTerm) return codes;

    return codes.filter((code) => {
      const symbol = getSymbolFromCurrency(code);
      const searchLower = searchTerm.toLowerCase();
      return (
        code.toLowerCase().includes(searchLower) ||
        (symbol && symbol.toLowerCase().includes(searchLower))
      );
    });
  }, [searchTerm]);

  const selectedCurrency = value
    ? `${getSymbolFromCurrency(value)} ${value}`
    : t.subscription.form.currency;

  const handleSelect = (selectedCode: string) => {
    onChange(selectedCode);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          id={id}
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full"
          onBlur={onBlur}
        >
          {selectedCurrency}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] p-0">
        <div className="flex items-center border-b px-3 py-2 sticky top-0 bg-popover">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={`${t.subscription.form.currency}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 p-0 focus-visible:ring-0 shadow-none"
          />
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filteredCodes.length > 0 ? (
            filteredCodes.map((code) => (
              <DropdownMenuItem
                key={code}
                onSelect={() => handleSelect(code)}
                className="cursor-pointer mx-1 my-0.5"
              >
                {`${getSymbolFromCurrency(code)} ${code}`}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled className="mx-1 my-0.5">
              No currencies found
            </DropdownMenuItem>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
