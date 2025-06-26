import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useI18n } from "@/contexts/LangContext";
import { useSubscription } from "@/contexts/SubsContext";
import { useTheme } from "@/contexts/ThemeContext";
import SubsDialog from "@/features/subscription/SubsDialog";
import { getTextColorForBackground } from "@/lib/color";
import { cn } from "@/lib/ui";
import type { Subscription } from "@/types/types";
import { Folder, Pause, Pencil, Play } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";
import { SubscriptionInfo } from "./SubscriptionInfo";

interface SubCardProps {
  sub: Subscription;
}

export function SubscriptionCard({ sub }: SubCardProps) {
  const [{ cats }, dispatch] = useSubscription();
  const { t } = useI18n();
  const { enableBackgroundColor } = useTheme();

  const isInactive = sub.status === "paused";

  const textColor = enableBackgroundColor
    ? getTextColorForBackground(sub.color)
    : "";

  // For inactive subscriptions, we want to apply a dimming effect
  const getCardStyles = () => {
    let backgroundColor = enableBackgroundColor ? sub.color : undefined;
    let opacity = "opacity-100";
    let brightness = "";

    if (isInactive) {
      brightness = "brightness-50";
      opacity = "opacity-70";
    }

    return { backgroundColor, opacity, brightness };
  };

  const { backgroundColor, opacity, brightness } = getCardStyles();

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
        brightness,
      )}
      style={{
        backgroundColor,
      }}
    >
      <SubscriptionInfo sub={sub} />
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
          <SubscriptionInfo sub={sub} />

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

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-md">
              <Folder size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">
                {cats[sub.categoryId]?.name ?? t.analyse.uncategorized}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-md">
              <span className="text-sm text-muted-foreground">
                {t.subscription.form.cycle.label}:
              </span>
              <span className="text-sm font-medium">
                {`${sub.cycle.num} ${t.subscription.form.cycle.map[sub.cycle.type]}`}
              </span>
            </div>

            {sub.notes && (
              <div className="p-4 bg-muted/20 rounded-md space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t.subscription.form.notes}
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {sub.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
