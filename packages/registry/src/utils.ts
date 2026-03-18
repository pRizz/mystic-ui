const EXCLUDED_DEPENDENCY_ROOTS = new Set(["solid-js", "styled-system"]);

export function normalizeDependencySpecifier(dependency: string) {
	if (dependency.startsWith(".") || dependency.startsWith("@/")) {
		return undefined;
	}

	if (dependency.startsWith("@")) {
		const [scope, packageName] = dependency.split("/");
		if (!scope || !packageName) {
			return undefined;
		}

		return `${scope}/${packageName}`;
	}

	const [packageName] = dependency.split("/");
	return packageName || undefined;
}

/**
 * Returns an array of npm dependencies from a component file
 * @param content component file
 * @returns array of npm deps
 */
export function extractDependencies(content: string) {
	// adapted from shadcn
	const npmDependencies = new Set<string>();
	const importRegex = /from\s+['"]([^'"]+)['"]/g;

	const matches = content.matchAll(importRegex);

	for (const match of matches) {
		const dependency = match[1];
		const normalizedDependency = normalizeDependencySpecifier(dependency);
		if (
			normalizedDependency &&
			!EXCLUDED_DEPENDENCY_ROOTS.has(normalizedDependency)
		) {
			npmDependencies.add(normalizedDependency);
		}
	}

	return npmDependencies.size
		? Array.from(npmDependencies).sort((left, right) =>
				left.localeCompare(right),
			)
		: undefined;
}
