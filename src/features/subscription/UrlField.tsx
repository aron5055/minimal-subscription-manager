import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/contexts/LangContext";

interface UrlFieldProps {
  url: string;
  setUrl: (url: string) => void;
  handleCheckedChange: (checked: boolean) => void;
}

export default function UrlField({
  url,
  setUrl,
  handleCheckedChange,
}: UrlFieldProps) {
  const { t } = useI18n();

  return (
    <>
      <Label htmlFor="url">{t.subscription.form.url.label}</Label>
      <div className="flex items-center gap-4">
        <Input
          id="url"
          value={url}
          onChange={(evt) => setUrl(evt.target.value)}
          spellCheck={false}
          placeholder={t.subscription.form.url.placeholder}
        />
        <Checkbox onCheckedChange={handleCheckedChange} />
      </div>
    </>
  );
}
