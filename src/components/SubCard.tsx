import { renderIcon } from "@/lib/renderIcon";
import type { Subscription } from "@/types/types";
import { Avatar } from "./ui/avatar";

interface SubCardProps {
  sub: Subscription;
}

export default function SubCard({ sub }: SubCardProps) {
  return (
    <div className="flex">
      <Avatar className="size-16">{renderIcon(sub.icon)}</Avatar>
      <div>25 DAYS</div>
    </div>
  );
}
