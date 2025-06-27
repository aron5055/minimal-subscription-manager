import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useI18n } from "@/contexts/lang";
import { useSubscription } from "@/contexts/subscription";
import { useTheme } from "@/contexts/theme";
import SubsDialog from "@/features/subscription/SubsDialog";
import { getTextColorForBackground } from "@/lib/color";
import { cn } from "@/lib/ui";
import type { Subscription } from "@/types/types";
import { Pause, Pencil, Play } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";
import { SubscriptionContent } from "./SubscriptionContent";
import { SubsInfoCard } from "./SubsInfoCard";

interface SubCardProps {
  sub: Subscription;
}

export function SubscriptionCard({ sub }: SubCardProps) {
  const { state, dispatch } = useSubscription();
  const { t } = useI18n();
  const { enableBackgroundColor } = useTheme();

  const isInactive = sub.status === "paused";

  const textColor = enableBackgroundColor
    ? getTextColorForBackground(sub.color)
    : "";

  // For inactive subscriptions, we want to apply a dimming effect
  const getCardStyles = () => {
    const backgroundColor = enableBackgroundColor ? sub.color : undefined;
    let opacity = "opacity-100";

    if (isInactive) {
      opacity = "opacity-50";
    }

    return { backgroundColor, opacity };
  };

  const { backgroundColor, opacity } = getCardStyles();

  const card = (
    <button
      className={cn(
        "relative group w-full p-4 border rounded-xl cursor-pointer transition-all duration-300",
        "shadow-md hover:shadow-xl hover:shadow-black/10",
        "hover:scale-[1.02] hover:-translate-y-1",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        "backdrop-blur-sm border-white/20",
        "active:scale-[0.98] active:transition-transform active:duration-100",
        textColor,
        opacity,
      )}
      type="button"
      style={{
        backgroundColor,
      }}
    >
      <SubsInfoCard sub={sub} />
    </button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{card}</SheetTrigger>
      <SheetContent className="space-y-6">
        <SheetHeader>
          <SheetTitle>{t.card.title}</SheetTitle>
          <SheetDescription>{t.card.description}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <SubsInfoCard sub={sub} />

          <div className="flex justify-center gap-2 p-4 bg-muted/30 rounded-lg">
            <SubsDialog
              sub={sub}
              mode="edit"
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Pencil size={14} />
                </Button>
              }
            />
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_SUB_STATUS",
                  id: sub.id,
                });
              }}
            >
              {sub.status === "active" ? (
                <Pause size={14} />
              ) : (
                <Play size={14} />
              )}
            </Button>
            <DeleteDialog subId={sub.id} title={sub.title} />
          </div>

          <SubscriptionContent cats={state.cats} sub={sub} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
