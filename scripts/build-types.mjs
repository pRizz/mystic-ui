import { rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(repoRoot, "components", "tailwind", "types");

function fail(message) {
	console.error(message);
	process.exit(1);
}

rmSync(outDir, { force: true, recursive: true });

const result = spawnSync(
	"bun",
	["x", "tsc", "-p", "components/tailwind/tsconfig.types.json"],
	{
		cwd: repoRoot,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	},
);

if (result.status !== 0) {
	if (result.stdout) {
		process.stdout.write(result.stdout);
	}
	if (result.stderr) {
		process.stderr.write(result.stderr);
	}
	fail("[build:types] Declaration generation failed.");
}

console.log("[build:types] OK");
