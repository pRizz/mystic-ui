// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";
import { getBasePath, withBasePath } from "~/lib/site-path";

function createPagesRedirectScript(basePath: string) {
	const normalizedBasePath = basePath === "/" ? "" : basePath;

	return `
		(() => {
			const currentUrl = new URL(window.location.href);
			const redirectPath = currentUrl.searchParams.get("__redirect");
			if (!redirectPath) {
				return;
			}

			window.history.replaceState(
				null,
				"",
				\`${normalizedBasePath}\${redirectPath}\`,
			);
			queueMicrotask(() => {
				window.dispatchEvent(new PopStateEvent("popstate"));
			});
			window.addEventListener(
				"load",
				() => {
					window.dispatchEvent(new PopStateEvent("popstate"));
				},
				{ once: true },
			);
		})();
	`;
}

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href={withBasePath("/favicon.ico")} />
					<script>{createPagesRedirectScript(getBasePath())}</script>
					{assets}
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
