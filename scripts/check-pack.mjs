#!/usr/bin/env node
/** Fails if `npm pack` would ship forbidden paths or miss required files. */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = (await import(path.join(ROOT, "package.json"), { with: { type: "json" } })).default;

const REQUIRED = ["package.json", "README.md", "LICENSE", "src/index.mjs", ...Object.values(pkg.bin ?? {})];

const FORBIDDEN = [
  [/(^|\/)\.env/, ".env"],
  [/(^|\/)\.git(hub)?(\/|$)/, ".git or .github"],
  [/(^|\/)tests?(\/|$)/, "tests"],
  [/(^|\/)scripts(\/|$)/, "scripts"],
  [/(^|\/)node_modules(\/|$)/, "node_modules"],
];

const r = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], { cwd: ROOT, encoding: "utf8" });
if (r.status !== 0) {
  console.error(r.stderr || r.stdout);
  process.exit(1);
}
const files = JSON.parse(r.stdout)[0].files.map((f) => f.path);
const problems = [
  ...REQUIRED.filter((f) => !files.includes(f)).map((f) => `${f}: missing`),
  ...files.flatMap((f) => FORBIDDEN.filter(([re]) => re.test(f)).map(([, label]) => `${f}: forbidden (${label})`)),
];
if (problems.length) {
  console.error(`pack check failed:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`pack ok: ${files.length} files`);
