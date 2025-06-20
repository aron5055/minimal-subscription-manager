import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

  const textColor = getTextColorForBackground("#ffffff");

  const card = (
    <div
      className={cn(
        "relative group w-full p-4 border rounded-lg cursor-pointer",
        textColor,
      )}
      style={
        {
          // backgroundColor: sub.color,
        }
      }
      role="button"
    >
      <SubscriptionInfo sub={sub} />
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{card}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t.card.title}</SheetTitle>
          <SheetDescription>{t.card.description}</SheetDescription>
        </SheetHeader>
        <Separator className="my-6" />
        <SubscriptionInfo sub={sub} />
        <Separator className="my-6" />
        <div className="flex justify-around">
          <SubsDialog
            sub={sub}
            mode="edit"
            trigger={
              <Button variant="ghost">
                <Pencil />
              </Button>
            }
          />
          <Button
            variant="ghost"
            onClick={() =>
              dispatch({
                type: "UPDATE_SUB",
                payload: {
                  ...sub,
                  status: sub.status === "active" ? "paused" : "active",
                },
              })
            }
          >
            {sub.status === "active" ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <DeleteDialog subId={sub.id} title={sub.title} />
        </div>
        <Separator className="my-6" />
        <div className="flex gap-4">
          <Folder />
          {cats[sub.categoryId].name}
        </div>
        <Separator className="my-6" />
        <div className="flex gap-4">
          {`${t.subscription.form.cycle.label}: `}
          <span>{`${sub.cycle.num} ${sub.cycle.type}`}</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
