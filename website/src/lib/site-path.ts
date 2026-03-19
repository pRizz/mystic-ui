const siteBasePath = normalizeBasePath(import.meta.env.SERVER_BASE_URL);

function normalizeBasePath(maybeBasePath?: string) {
	if (!maybeBasePath || maybeBasePath === "/") {
		return "";
	}

	return `/${maybeBasePath.replace(/^\/+|\/+$/g, "")}`;
}

function isExternalPath(path: string) {
	return (
		path.startsWith("#") ||
		path.startsWith("mailto:") ||
		path.startsWith("tel:") ||
		/^[a-z]+:/i.test(path) ||
		path.startsWith("//")
	);
}

function normalizePath(path: string) {
	if (!path || path === "/") {
		return "/";
	}

	return path.startsWith("/") ? path : `/${path}`;
}

export function withBasePath(path: string) {
	if (isExternalPath(path)) {
		return path;
	}

	const normalizedPath = normalizePath(path);
	if (!siteBasePath) {
		return normalizedPath;
	}

	if (
		normalizedPath === siteBasePath ||
		normalizedPath.startsWith(`${siteBasePath}/`)
	) {
		return normalizedPath;
	}

	return normalizedPath === "/"
		? siteBasePath
		: `${siteBasePath}${normalizedPath}`;
}

export function getBasePath() {
	return siteBasePath || "/";
}
