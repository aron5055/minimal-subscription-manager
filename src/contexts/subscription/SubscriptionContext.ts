import type { Action } from "@/reducers/rootReducer";
import type { State } from "@/types/types";
import { createContext } from "react";

export interface SubscriptionContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const SubsContext = createContext<SubscriptionContextValue>({
  state: { subs: [], cats: {} },
  dispatch: () => {},
});
