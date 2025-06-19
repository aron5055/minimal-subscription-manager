import { useI18n } from "@/contexts/LangContext";
import AnalyticsDrawer from "@/features/analytics/AnalyticsDrawer";
import SubsDialog from "@/features/subscription/SubsDialog";
import { IoAdd } from "react-icons/io5";
import { Button } from "../ui/button";

export default function Footer() {
  const { t } = useI18n();

  const trigger = (
    <Button aria-label={t.subscription.add}>
      <IoAdd />
    </Button>
  );

  return (
    <footer className="border-t flex justify-around items-center h-16 p-4 bg-background">
      <AnalyticsDrawer />
      <SubsDialog trigger={trigger} />
      <Button></Button>
    </footer>
  );
}
