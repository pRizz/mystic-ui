const githubPagesDeployTargets = new Set([
	"github-pages",
	"github_pages",
	"gh-pages",
]);

function normalizeOptionalValue(maybeValue) {
	if (typeof maybeValue !== "string") {
		return undefined;
	}

	const trimmedValue = maybeValue.trim();
	return trimmedValue ? trimmedValue : undefined;
}

export function normalizeBasePath(maybeBasePath) {
	const normalizedValue = normalizeOptionalValue(maybeBasePath);
	if (!normalizedValue || normalizedValue === "/") {
		return "/";
	}

	return `/${normalizedValue.replace(/^\/+|\/+$/gu, "")}`;
}

function getRepositoryName(maybeRepository) {
	const normalizedRepository = normalizeOptionalValue(maybeRepository);
	if (!normalizedRepository) {
		return undefined;
	}

	const repositorySegments = normalizedRepository.split("/");
	return repositorySegments[1];
}

function isGitHubPagesDeployTarget(maybeDeployTarget) {
	const normalizedDeployTarget = normalizeOptionalValue(maybeDeployTarget);
	if (!normalizedDeployTarget) {
		return false;
	}

	return githubPagesDeployTargets.has(normalizedDeployTarget.toLowerCase());
}

export function resolveDeployConfig(env = process.env) {
	const maybeExplicitBasePath = normalizeOptionalValue(env.BASE_PATH);
	const maybeRepositoryName = getRepositoryName(env.GITHUB_REPOSITORY);
	const deployTarget = normalizeOptionalValue(env.DEPLOY_TARGET) ?? "standalone";
	const isGitHubPages = isGitHubPagesDeployTarget(deployTarget);
	const basePath = maybeExplicitBasePath
		? normalizeBasePath(maybeExplicitBasePath)
		: isGitHubPages && maybeRepositoryName
			? normalizeBasePath(maybeRepositoryName)
			: "/";

	return {
		basePath,
		deployTarget,
		isGitHubPages,
		repositoryName: maybeRepositoryName,
	};
}
