import { describe, it, expect } from "vitest";
import { earn, redeem, getBalance, type Store } from "./domain";

const createMemoryStore = (): Store => {
  const balances = new Map<string, number>();
  return {
    get: (customerId: string) => balances.get(customerId) ?? 0,
    set: (customerId: string, balance: number) => {
      balances.set(customerId, balance);
    },
  };
};

describe("Customer Loyalty Points domain", () => {
  it("should add points to a customer's balance and trigger a warning when redeeming leaves the balance below the threshold", () => {
    const store = createMemoryStore();
    expect(earn(store, "user123", 100).ok).toBe(true);

    const result = redeem(store, "user123", 95);
    expect(result.ok).toBe(true);
    expect(result.message).toMatch(
      /Warning: Customer user123 has a low balance: 5 points./
    );
    expect(getBalance(store, "user123")).toBe(5);
  });

  it("should prevent redeeming more points than available and keep the balance unchanged", () => {
    const store = createMemoryStore();
    earn(store, "user123", 5);

    const balanceBefore = getBalance(store, "user123");
    const result = redeem(store, "user123", 10);

    expect(result.ok).toBe(false);
    expect(getBalance(store, "user123")).toBe(balanceBefore);
  });

  it("should reject earning points if the input is not a positive integer", () => {
    const store = createMemoryStore();
    const result = earn(store, "user123", -10);
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Points must be a positive integer.");
  });

  it("should reject redeeming points if the input is not a positive integer", () => {
    const store = createMemoryStore();
    earn(store, "user123", 20);

    const result = redeem(store, "user123", 0);
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Points must be a positive integer.");
  });
});
