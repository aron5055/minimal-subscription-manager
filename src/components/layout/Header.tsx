import { useI18n } from "@/contexts/LangContext";
import SettingDropDown from "@/features/settings/settingDropDown";

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 w-full border-b shadow-sm">
      <div className="w-full flex h-16 items-center justify-around px-4 md:px-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
            <span className="text-lg font-bold">S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {t.title}
          </h1>
        </div>
        <SettingDropDown />
      </div>
    </header>
  );
}
