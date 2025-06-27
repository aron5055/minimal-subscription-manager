import type { Category, State, Subscription } from "@/types/types";

export type Action =
  | { type: "ADD_SUB"; payload: Subscription }
  | { type: "UPDATE_SUB"; payload: Subscription }
  | { type: "DELETE_SUB"; id: string }
  | { type: "RESET_SUB" }
  | { type: "MOVE_SUB"; id: string; to: string }
  | { type: "REORDER"; payload: Subscription[] }
  | { type: "TOGGLE_SUB_STATUS"; id: string }
  | { type: "ADD_CAT"; cat: Category }
  | { type: "RENAME_CAT"; id: string; name: string }
  | { type: "DELETE_CAT"; id: string }
  | { type: "RESET_CAT" }
  | { type: "HYDRATE_STATE"; payload: State };

function subReducer(subs: Subscription[], a: Action) {
  switch (a.type) {
    case "ADD_SUB": {
      return [...subs, a.payload];
    }
    case "UPDATE_SUB": {
      return subs.map((s) => (s.id === a.payload.id ? a.payload : s));
    }
    case "DELETE_SUB": {
      return subs.filter((s) => s.id !== a.id);
    }
    case "RESET_SUB": {
      return [];
    }
    case "REORDER": {
      return a.payload;
    }
    case "TOGGLE_SUB_STATUS": {
      return subs.map((s) =>
        s.id === a.id
          ? {
              ...s,
              status:
                s.status === "active"
                  ? ("paused" as const)
                  : ("active" as const),
            }
          : s,
      );
    }
    case "MOVE_SUB": {
      // move subscription to a different category
      return subs.map((s) => (s.id === a.id ? { ...s, categoryId: a.to } : s));
    }
    case "DELETE_CAT": {
      // Move subscriptions from deleted category to default (empty string)
      return subs.map((s) =>
        s.categoryId === a.id ? { ...s, categoryId: "" } : s,
      );
    }
    default:
      return subs;
  }
}

function catReducer(cats: Record<string, Category>, a: Action) {
  switch (a.type) {
    case "ADD_CAT": {
      return { ...cats, [a.cat.id]: a.cat };
    }
    case "RENAME_CAT": {
      return { ...cats, [a.id]: { ...cats[a.id], name: a.name } };
    }
    case "DELETE_CAT": {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [a.id]: _, ...remaining } = cats;
      return remaining;
    }
    case "RESET_CAT": {
      return {};
    }
    default:
      return cats;
  }
}

export default function rootReducer(state: State, a: Action) {
  if (a.type === "HYDRATE_STATE") {
    return a.payload;
  }

  let subs = subReducer(state.subs, a);
  subs = [
    ...subs.filter((s) => s.status === "active"),
    ...subs.filter((s) => s.status === "paused"),
  ];
  const cats = catReducer(state.cats, a);

  return state.subs === subs && state.cats === cats ? state : { subs, cats };
}
