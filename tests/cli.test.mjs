import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const BIN = fileURLToPath(new URL("../bin/template-node-package.mjs", import.meta.url));

test("binary greets the given name", () => {
  assert.equal(execFileSync(process.execPath, [BIN, "Node"], { encoding: "utf8" }), "Hello, Node!\n");
});

test("binary defaults to world", () => {
  assert.equal(execFileSync(process.execPath, [BIN], { encoding: "utf8" }), "Hello, world!\n");
});
