import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Action } from "@/reducers/rootReducer";
import rootReducer from "@/reducers/rootReducer";
import type { State } from "@/types/types";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type FC,
  type ReactNode,
} from "react";

const SubsContext = createContext<[State, React.Dispatch<Action>]>([
  { subs: [], cats: {} },
  () => {},
]);

export const SubsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [persisted, setPersisted] = useLocalStorage<State>("sm-state", {
    subs: [],
    cats: {},
  });

  const [state, dispatch] = useReducer(rootReducer, persisted);

  useEffect(() => setPersisted(state), [state, setPersisted]);

  return (
    <SubsContext.Provider value={[state, dispatch]}>
      {children}
    </SubsContext.Provider>
  );
};

export function useSubscription() {
  return useContext(SubsContext);
}

export function useAllCats() {
  const [{ cats }] = useSubscription();
  return useMemo(
    () => Object.values(cats).sort((a, b) => a.name.localeCompare(b.name)),
    [cats],
  );
}
