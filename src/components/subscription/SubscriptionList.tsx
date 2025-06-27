import { useFilter } from "@/contexts/filter";
import { useI18n } from "@/contexts/lang";
import { useSort } from "@/contexts/sort";
import { useSubscription } from "@/contexts/subscription";
import { CardItem } from "@/features/subscription/components/CardItem";
import { SortableItem } from "@/features/subscription/components/SortableItem";
import { filterSubs, sortSubs } from "@/lib/subs";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

export function SubscriptionList() {
  const { t } = useI18n();
  const { state, dispatch } = useSubscription();
  const { sortType } = useSort();
  const { filterType } = useFilter();

  const displaySubs = useMemo(() => {
    const sortedSubs = sortSubs(state.subs, sortType, state.cats);
    return filterSubs(sortedSubs, filterType);
  }, [state.subs, sortType, state.cats, filterType]);

  // When sorting or filtering is applied, disable drag and drop
  const isDragDisabled = useMemo(() => {
    if (sortType !== null) {
      return true;
    }

    const hasFilter = Object.values(filterType).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null;
    });
    if (hasFilter) {
      return true;
    }

    return false;
  }, [sortType, filterType]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const items = useMemo(() => displaySubs.map((sub) => sub.id), [displaySubs]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    if (isDragDisabled) return;

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);

      dispatch({
        type: "REORDER",
        payload: arrayMove(state.subs, oldIndex, newIndex),
      });
    }

    setActiveId(null);
  }

  function handleDragStart(event: DragStartEvent) {
    if (isDragDisabled) return;

    const { active } = event;
    setActiveId(active.id);
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <main className="flex-1 overflow-y-auto w-full p-6 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {displaySubs.length > 0 ? (
              displaySubs.map((sub) => (
                <SortableItem
                  key={sub.id}
                  sub={sub}
                  disabled={isDragDisabled}
                  isDragging={activeId === sub.id}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">( ˘▾˘)~♪</div>
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.nosubs.label}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  {t.nosubs.description}
                </p>
              </div>
            )}
          </SortableContext>
          <DragOverlay>
            {activeId ? <CardItem id={activeId} /> : null}
          </DragOverlay>
        </div>
      </main>
    </DndContext>
  );
}
