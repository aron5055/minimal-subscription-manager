import { useLocalStorage } from "@/hooks/useLocalStorage";
import rootReducer from "@/reducers/rootReducer";
import type { State } from "@/types/types";
import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import { SubsContext } from "./SubscriptionContext";

export function SubsProvider({ children }: { children: ReactNode }) {
  const [persisted, setPersisted] = useLocalStorage<State>("sm-state", {
    subs: [],
    cats: {},
  });

  const [state, dispatch] = useReducer(rootReducer, persisted);

  useEffect(() => setPersisted(state), [state, setPersisted]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <SubsContext.Provider value={value}>{children}</SubsContext.Provider>;
}
