import { DndContext } from "@dnd-kit/core";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <DndContext>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1"></main>
        <Footer />
      </div>
    </DndContext>
  );
}

export default App;
