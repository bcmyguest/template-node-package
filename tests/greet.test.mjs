import assert from "node:assert/strict";
import { test } from "node:test";
import { greet } from "../src/index.mjs";

test("greets by name", () => {
  assert.equal(greet("world"), "Hello, world!");
});
