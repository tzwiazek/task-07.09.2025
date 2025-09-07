export type Store = {
  get(id: string): number;
  set(id: string, balance: number): void;
};

export type Result =
  | { ok: true; message: string }
  | { ok: false; message: string };

const LOW_BALANCE_THRESHOLD = 10;

export const getBalance = (store: Store, customerId: string): number =>
  store.get(customerId) ?? 0;

export const validatePoints = (points: number): string | null => {
  if (!Number.isInteger(points) || points <= 0) {
    return "Points must be a positive integer.";
  }
  return null;
};

export const earn = (
  store: Store,
  customerId: string,
  points: number
): Result => {
  const error = validatePoints(points);
  if (error) {
    return { ok: false, message: error };
  }

  const newBal = getBalance(store, customerId) + points;
  store.set(customerId, newBal);
  return {
    ok: true,
    message: `Earned ${points} points for ${customerId}. Balance: ${newBal}`,
  };
};

export const redeem = (
  store: Store,
  customerId: string,
  points: number
): Result => {
  const error = validatePoints(points);
  if (error) {
    return { ok: false, message: error };
  }

  const current = getBalance(store, customerId);
  if (points > current) {
    return {
      ok: false,
      message: `Redeem failed: ${customerId} has only ${current} points.`,
    };
  }

  const newBal = current - points;
  store.set(customerId, newBal);

  let message = `Redeemed ${points} points for ${customerId}. Balance: ${newBal}`;
  if (newBal < LOW_BALANCE_THRESHOLD) {
    message += `\nWarning: Customer ${customerId} has a low balance: ${newBal} points.`;
  }

  return { ok: true, message };
};
