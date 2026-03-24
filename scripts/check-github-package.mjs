import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function fail(message) {
	console.error(message);
	process.exit(1);
}

function run(command, args) {
	const result = spawnSync(command, args, {
		cwd: repoRoot,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	});

	if (result.status !== 0) {
		if (result.stdout) {
			process.stdout.write(result.stdout);
		}
		if (result.stderr) {
			process.stderr.write(result.stderr);
		}
		fail(`[check:github-package] ${command} ${args.join(" ")} failed.`);
	}

	return result.stdout;
}

const packageJson = JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));
const expectedTypesPath = "./components/tailwind/types/index.d.ts";
const expectedImportPath = "./components/tailwind/src/index.ts";
const expectedSetupTypesPath = "./components/tailwind/types/setup/index.d.ts";
const expectedSetupImportPath = "./components/tailwind/src/setup/index.ts";
const expectedThemeCssPath = "./components/tailwind/src/setup/theme.css";
const expectedSolidPeerVersion = "^1.9.8";
const rootExport = packageJson.exports?.["."];
const tailwindExport = packageJson.exports?.["./tailwind"];
const setupExport = packageJson.exports?.["./tailwind/setup"];
const themeCssExport = packageJson.exports?.["./tailwind/theme.css"];

if (!rootExport || !tailwindExport || !setupExport || !themeCssExport) {
	fail(
		"[check:github-package] package.json must export \".\", \"./tailwind\", \"./tailwind/setup\", and \"./tailwind/theme.css\".",
	);
}

for (const [key, entry] of Object.entries({
	".": rootExport,
	"./tailwind": tailwindExport,
})) {
	if (
		entry.types !== expectedTypesPath ||
		entry.import !== expectedImportPath ||
		entry.default !== expectedImportPath
	) {
		fail(
			`[check:github-package] ${key} must point to ${expectedTypesPath} and ${expectedImportPath}.`,
		);
	}
}

if (
	setupExport.types !== expectedSetupTypesPath ||
	setupExport.import !== expectedSetupImportPath ||
	setupExport.default !== expectedSetupImportPath
) {
	fail(
		`[check:github-package] ./tailwind/setup must point to ${expectedSetupTypesPath} and ${expectedSetupImportPath}.`,
	);
}

if (themeCssExport !== expectedThemeCssPath) {
	fail(
		`[check:github-package] ./tailwind/theme.css must point to ${expectedThemeCssPath}.`,
	);
}

if (packageJson.exports["./panda"]) {
	fail("[check:github-package] Panda must not be exported from the root package.");
}

if (packageJson.peerDependencies?.["solid-js"] !== expectedSolidPeerVersion) {
	fail(
		`[check:github-package] solid-js peer dependency must stay at ${expectedSolidPeerVersion} or the documented consumer baseline drifts.`,
	);
}

console.log("[agent hint] Verifying Tailwind workspace checks.");
run("bun", ["run", "--filter", "@mystic-ui/tailwind", "check"]);

console.log("[agent hint] Verifying committed generated types.");
run("bun", ["run", "check:types"]);

console.log("[agent hint] Verifying npm pack contents stay package-focused.");
const packOutput = run("npm", ["pack", "--dry-run", "--json"]);
const packResults = JSON.parse(packOutput);
const packedFiles = new Set(packResults.at(-1)?.files?.map((file) => file.path) ?? []);

const requiredFiles = [
	"package.json",
	"README.md",
	"LICENSE.md",
	"components/tailwind/src/index.ts",
	"components/tailwind/src/setup/index.ts",
	"components/tailwind/src/setup/theme.css",
	"components/tailwind/types/index.d.ts",
	"components/tailwind/types/setup/index.d.ts",
];

for (const requiredFile of requiredFiles) {
	if (!packedFiles.has(requiredFile)) {
		fail(`[check:github-package] Missing packed file: ${requiredFile}`);
	}
}

const forbiddenPrefixes = [
	"components/panda/",
	"packages/",
	"templates/",
	"website/",
	"components/tailwind/.storybook/",
	"components/tailwind/src/stories/",
];

for (const packedFile of packedFiles) {
	if (packedFile === "components/tailwind/src/index.d.ts") {
		fail("[check:github-package] The hand-written declaration shim must not be packed.");
	}
	const forbiddenPrefix = forbiddenPrefixes.find((prefix) => packedFile.startsWith(prefix));
	if (forbiddenPrefix) {
		fail(
			`[check:github-package] Packed file ${packedFile} violates forbidden prefix ${forbiddenPrefix}`,
		);
	}
}

console.log("[check:github-package] OK");
