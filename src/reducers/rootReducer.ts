import type { Category, State, Subscription } from "@/types/types";
import { omit } from "lodash-es";

export type Action =
  | { type: "ADD_SUB"; payload: Subscription }
  | { type: "UPDATE_SUB"; payload: Subscription }
  | { type: "DELETE_SUB"; id: string }
  | { type: "RESET_SUB" }
  | { type: "MOVE_SUB"; id: string; to: string }
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
    case "MOVE_SUB": {
      return subs.map((s) => (s.id === a.id ? { ...s, categoryId: a.to } : s));
    }
    default:
      return subs;
  }
}

function catReducer(
  cats: Record<string, Category>,
  a: Action,
  subs: Subscription[],
) {
  switch (a.type) {
    case "ADD_CAT": {
      return { ...cats, [a.cat.id]: a.cat };
    }
    case "RENAME_CAT": {
      return { ...cats, [a.id]: { ...cats[a.id], name: a.name } };
    }
    case "DELETE_CAT": {
      return subs.some((s) => s.categoryId === a.id) ? cats : omit(cats, a.id);
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

  const subs = subReducer(state.subs, a);
  const cats = catReducer(state.cats, a, subs);

  return state.subs === subs && state.cats === cats ? state : { subs, cats };
}
