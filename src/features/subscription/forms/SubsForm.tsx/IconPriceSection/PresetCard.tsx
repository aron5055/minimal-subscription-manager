import { Avatar } from "@/components/ui/avatar";
import { renderIcon } from "@/lib/icon";
import type { Subscription } from "@/types/types";

interface PresetCardProps {
  sub: Subscription;
  onClick?: () => void;
}

export function PresetCard({ sub, onClick }: PresetCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 cursor-pointer min-h-[100px] aspect-square shadow-sm hover:shadow-md"
    >
      <Avatar className="w-8 h-8 mb-2 flex-shrink-0">
        {renderIcon(sub.icon)}
      </Avatar>
      <span className="text-sm font-medium text-center text-card-foreground line-clamp-2">
        {sub.title}
      </span>
    </button>
  );
}
