import { useSubscription } from "@/contexts/SubsContext";
import SubsDialog from "@/features/subscription/SubsDialog";
import { cn, getTextColorForBackground } from "@/lib/utils";
import type { Subscription } from "@/types/types";
import { Folder, Pause, Pencil, Play, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SubscriptionInfo from "./SubscriptionInfo";

interface SubCardProps {
  sub: Subscription;
}

export default function SubscriptionCard({ sub }: SubCardProps) {
  const [{ cats }, dispatch] = useSubscription();

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
      <div className="flex items-center justify-between">
        <SubscriptionInfo sub={sub} />
        <Button
          size="icon"
          variant="ghost"
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 hover:bg-black/10"
          onClick={(e) => {
            e.stopPropagation();
            // toggleStatus(sub.id)
          }}
        >
          {sub.status === "active" ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{card}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
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
          <Button variant="ghost">
            {sub.status === "active" ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button
            variant="ghost"
            onClick={() => dispatch({ type: "DELETE_SUB", id: sub.id })}
          >
            <Trash />
          </Button>
        </div>
        <Separator className="my-6" />
        <div className="flex">
          <Folder />
          {cats[sub.categoryId].name}
        </div>
        <Separator className="my-6" />
        <div>
          Biling Cycle:
          {sub.cycle.num}
          {sub.cycle.type}
        </div>
      </SheetContent>
    </Sheet>
  );
}
