import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const result = spawnSync("git", ["config", "core.hooksPath", ".githooks"], {
	cwd: repoRoot,
	stdio: "inherit",
});

if (result.status !== 0) {
	process.exit(result.status ?? 1);
}

console.log("[githooks:install] Installed .githooks as core.hooksPath");
