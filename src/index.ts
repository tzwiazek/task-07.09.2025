import { createMemoryStore } from "./loyalty/store.memory";
import { runOnce, runRepl } from "./loyalty/cli";

const store = createMemoryStore();
const [, , ...args] = process.argv;

args.length ? runOnce(store, args) : runRepl(store);