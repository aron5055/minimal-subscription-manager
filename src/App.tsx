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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { useSubscription } from "./contexts/SubsContext";
import { CardItem } from "./features/subscription/components/CardItem";
import { SortableItem } from "./features/subscription/components/SortableItem";

function App() {
  const [{ subs }, dispatch] = useSubscription();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState(subs.map((sub) => sub.id));
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
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        dispatch({
          type: "REORDER",
          payload: arrayMove(subs, oldIndex, newIndex),
        });
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragStart(event: DragStartEvent) {
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
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto w-full p-6 min-h-0">
          <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {subs
                .filter((sub) => sub.status === "active")
                .map((sub) => (
                  <SortableItem key={sub.id} sub={sub} />
                ))}
              {subs
                .filter((sub) => sub.status === "paused")
                .map((sub) => (
                  <SortableItem key={sub.id} sub={sub} />
                ))}
            </SortableContext>
            <DragOverlay>
              {activeId ? <CardItem id={activeId} /> : null}
            </DragOverlay>
          </div>
        </main>
        <Footer />
      </div>
    </DndContext>
  );
}

export default App;
