#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(scriptDirectory, "..", ".output", "public");

function normalizeBasePath(maybeBasePath) {
	if (!maybeBasePath || maybeBasePath === "/") {
		return "/";
	}

	return `/${maybeBasePath.replace(/^\/+|\/+$/gu, "")}`;
}

function createNotFoundPage(basePath) {
	const baseHref = basePath === "/" ? "/" : `${basePath}/`;
	const serializedBasePath = JSON.stringify(basePath);

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Redirecting…</title>
		<script>
			(() => {
				const basePath = ${serializedBasePath};
				const currentUrl = new URL(window.location.href);
				const requestPath = currentUrl.pathname.startsWith(basePath)
					? currentUrl.pathname.slice(basePath.length) || "/"
					: currentUrl.pathname || "/";
				const redirectUrl = new URL(${JSON.stringify(baseHref)}, currentUrl.origin);
				redirectUrl.searchParams.set(
					"__redirect",
					\`\${requestPath}\${currentUrl.search}\${currentUrl.hash}\`,
				);
				window.location.replace(redirectUrl.toString());
			})();
		</script>
	</head>
	<body>
		<p>Redirecting…</p>
	</body>
</html>
`;
}

const basePath = normalizeBasePath(process.env.BASE_PATH);

await mkdir(outputDirectory, { recursive: true });
await writeFile(
	path.join(outputDirectory, "404.html"),
	createNotFoundPage(basePath),
	"utf8",
);
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");
