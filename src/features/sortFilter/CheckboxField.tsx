import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxFieldProps {
  checkId: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxField({
  checkId,
  label,
  checked,
  onCheckedChange,
}: CheckboxFieldProps) {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-color">
      <Checkbox
        id={`filter-${checkId}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label
        htmlFor={`filter-${checkId}`}
        className="text-sm cursor-pointer flex-1"
      >
        {label}
      </Label>
    </div>
  );
}
