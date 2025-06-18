import { DndContext } from "@dnd-kit/core";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import SubscriptionCard from "./components/SubscriptionCard/SubscriptionCard";
import { useSubscription } from "./contexts/SubsContext";

function App() {
  const [{ subs }] = useSubscription();

  return (
    <DndContext>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto w-full p-6 min-h-0">
          <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
            {subs.map((sub) => (
              <SubscriptionCard key={sub.id} sub={sub} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </DndContext>
  );
}

export default App;
