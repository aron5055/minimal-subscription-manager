import type { Subscription } from "@/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SubscriptionCard } from "./SubscriptionCard";

interface SortableItemProps {
  sub: Subscription;
}

export function SortableItem({ sub }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sub.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SubscriptionCard sub={sub} />
    </div>
  );
}
