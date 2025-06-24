import { useI18n } from "@/contexts/LangContext";
import AnalyticsDrawer from "@/features/analytics/AnalyticsDrawer";
import { SortFilterMenu } from "@/features/sortFilter/SortFilterMenu";
import SubsDialog from "@/features/subscription/SubsDialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  const { t } = useI18n();

  const trigger = (
    <Button aria-label={t.subscription.add} variant="outline">
      <Plus style={{ width: "24px", height: "24px" }} />
    </Button>
  );

  return (
    <footer className="border-t flex justify-around items-center h-16 p-4 bg-background">
      <AnalyticsDrawer />
      <SubsDialog trigger={trigger} />
      <SortFilterMenu />
    </footer>
  );
}
