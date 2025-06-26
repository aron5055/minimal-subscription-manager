import { useI18n } from "@/contexts/lang";
import SettingDropDown from "@/features/settings/SettingDropDown";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="w-full border-b border-border/40 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <span className="text-lg font-bold">S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-card-foreground">
            {t.title}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <SettingDropDown />
        </div>
      </div>
    </header>
  );
}
