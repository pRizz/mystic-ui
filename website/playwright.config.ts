import { defineConfig } from "@playwright/test";
import { resolveDeployConfig } from "./scripts/deploy-config.mjs";

const { basePath } = resolveDeployConfig({
	...process.env,
	BASE_PATH: process.env.PLAYWRIGHT_BASE_PATH ?? process.env.BASE_PATH,
});
const baseURL = `http://127.0.0.1:3000${basePath === "/" ? "/" : `${basePath}/`}`;
const webServerCommand = `BASE_PATH=${JSON.stringify(basePath)} bun run dev --host 127.0.0.1 --port 3000`;

export default defineConfig({
	reporter: "list",
	testDir: "./e2e",
	testMatch: /.*\.spec\.ts$/,
	timeout: 300_000,
	use: {
		baseURL,
		trace: "retain-on-failure",
	},
	webServer: {
		command: webServerCommand,
		port: 3000,
		reuseExistingServer: true,
		timeout: 120_000,
	},
});
