import { earn, redeem, getBalance, type Store } from "./domain";

const HELP = [
  "Commands:",
  "  earn <customerId> <points>",
  "  redeem <customerId> <points>",
  "  balance <customerId>",
  "  help",
  "  exit",
].join("\n");

export const runOnce = (store: Store, argv: string[]): void => {
  const [cmd = "", customerId, pointsStr] = argv;

  switch (cmd.toLowerCase()) {
    case "earn": {
      if (!customerId || pointsStr == null)
        return void console.log("Usage: earn <customerId> <points>");
      console.log(earn(store, customerId, Number(pointsStr)).message);
      return;
    }
    case "redeem": {
      if (!customerId || pointsStr == null)
        return void console.log("Usage: redeem <customerId> <points>");
      console.log(redeem(store, customerId, Number(pointsStr)).message);
      return;
    }
    case "balance": {
      if (!customerId) return void console.log("Usage: balance <customerId>");
      console.log(
        `Balance for ${customerId}: ${getBalance(store, customerId)}`,
      );
      return;
    }
    case "help":
      console.log(HELP);
      return;
    case "exit":
      process.exit(0);
    default:
      console.log('Unknown command. Type "help" for usage.');
  }
};

export const runRepl = (store: Store): void => {
  console.log("Customer Loyalty Points System (TypeScript)");
  console.log(HELP);
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });
  rl.prompt();
  rl.on("line", (line: string) => {
    runOnce(store, line.trim().split(/\s+/));
    rl.prompt();
  });
  rl.on("close", () => process.exit(0));
};
