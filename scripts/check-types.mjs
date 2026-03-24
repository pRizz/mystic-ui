import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedDir = path.join(repoRoot, "components", "tailwind", "types");

function fail(message) {
	console.error(message);
	process.exit(1);
}

function listFiles(rootDir, relativeDir = ".") {
	const currentDir = path.join(rootDir, relativeDir);
	const entries = readdirSync(currentDir, { withFileTypes: true });
	return entries.flatMap((entry) => {
		const nextRelativePath =
			relativeDir === "."
				? entry.name
				: path.posix.join(relativeDir, entry.name);
		if (entry.isDirectory()) {
			return listFiles(rootDir, nextRelativePath);
		}
		return [nextRelativePath];
	});
}

if (!statSync(expectedDir, { throwIfNoEntry: false })?.isDirectory()) {
	fail("[check:types] Missing committed declaration output. Run bun run build:types.");
}

const tempDir = mkdtempSync(path.join(tmpdir(), "mystic-ui-types-"));

try {
	const result = spawnSync(
		"bun",
		[
			"x",
			"tsc",
			"-p",
			"components/tailwind/tsconfig.types.json",
			"--outDir",
			tempDir,
		],
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
		fail("[check:types] Declaration generation failed.");
	}

	const expectedFiles = new Set(listFiles(expectedDir));
	const actualFiles = new Set(listFiles(tempDir));

	for (const file of expectedFiles) {
		if (!actualFiles.has(file)) {
			fail(`[check:types] Missing generated declaration: ${file}`);
		}
	}

	for (const file of actualFiles) {
		if (!expectedFiles.has(file)) {
			fail(`[check:types] Uncommitted generated declaration: ${file}`);
		}
	}

	for (const file of expectedFiles) {
		const expectedContents = readFileSync(path.join(expectedDir, file), "utf8");
		const actualContents = readFileSync(path.join(tempDir, file), "utf8");
		if (expectedContents !== actualContents) {
			fail(
				`[check:types] Generated types are stale at ${file}. Run bun run build:types.`,
			);
		}
	}

	console.log("[check:types] OK");
} finally {
	rmSync(tempDir, { force: true, recursive: true });
}
