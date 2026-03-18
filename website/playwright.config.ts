import { defineConfig } from "@playwright/test";

export default defineConfig({
	reporter: "list",
	testDir: "./e2e",
	testMatch: "gallery-screenshots.spec.ts",
	timeout: 300_000,
	use: {
		baseURL: "http://127.0.0.1:3000",
		trace: "retain-on-failure",
	},
	webServer: {
		command: "bun run dev --host 127.0.0.1 --port 3000",
		port: 3000,
		reuseExistingServer: true,
		timeout: 120_000,
	},
});
