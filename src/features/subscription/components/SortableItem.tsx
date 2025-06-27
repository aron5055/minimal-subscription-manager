import { cn } from "@/lib";
import type { Subscription } from "@/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { SubscriptionCard } from "./SubscriptionCard";

interface SortableItemProps {
  sub: Subscription;
  disabled?: boolean;
  isDragging: boolean;
}

export function SortableItem({
  sub,
  disabled = false,
  isDragging,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sub.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("relative group", isDragging ? "opacity-0" : "")}
    >
      <SubscriptionCard sub={sub} />
      {!disabled && (
        <div
          {...listeners}
          className="absolute top-2 right-2 p-1 rounded bg-black/10 hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} className="text-white/80" />
        </div>
      )}
    </div>
  );
}
