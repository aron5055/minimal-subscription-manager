import { useContext } from "react";
import { SubsContext } from "./SubscriptionContext";

export function useSubscription() {
  const context = useContext(SubsContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubsProvider");
  }
  return context;
}
