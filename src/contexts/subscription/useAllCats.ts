import { useMemo } from "react";
import { useSubscription } from "./useSubscription";

export function useAllCats() {
  const { state } = useSubscription();
  return useMemo(
    () =>
      Object.values(state.cats).sort((a, b) => a.name.localeCompare(b.name)),
    [state.cats],
  );
}
