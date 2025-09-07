import type { Store } from "./domain";

export const createMemoryStore = (): Store => {
  const map = new Map<string, number>();
  return {
    get: (id) => map.get(id) ?? 0,
    set: (id, balance) => {
      map.set(id, balance);
    },
  };
};
