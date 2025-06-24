import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { SubscriptionList } from "./components/subscription/SubscriptionList";
import { useExpiredSubscriptions } from "./hooks/useExpiredSubscriptions";

function App() {
  // Automatically pause expired subscriptions
  useExpiredSubscriptions();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <SubscriptionList />
      <Footer />
    </div>
  );
}

export default App;
