#!/usr/bin/env node
// CLI shim: argument parsing and output only. Swap in node:util parseArgs
// when real flags arrive.
import { greet } from "../src/index.mjs";

console.log(greet(process.argv[2] ?? "world"));
