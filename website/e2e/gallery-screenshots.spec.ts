import { mkdir } from "node:fs/promises";
import path from "node:path";
import { type Page, expect, test } from "@playwright/test";

const frameworks = ["panda", "tailwind"] as const;

async function collectGalleryEntries(
	page: Page,
	framework: (typeof frameworks)[number],
) {
	await page.goto(`/gallery/${framework}`);
	await expect(page.locator("[data-gallery-card]").first()).toBeVisible();

	return page.locator("[data-gallery-card]").evaluateAll((cards) =>
		cards
			.map((card) => ({
				id: card.getAttribute("data-component-id"),
				previewHref: card.getAttribute("data-preview-href"),
			}))
			.filter(
				(
					entry,
				): entry is {
					id: string;
					previewHref: string;
				} => Boolean(entry.id && entry.previewHref),
			),
	);
}

async function waitForPreviewReady(page: Page) {
	await expect(page.locator("[data-gallery-preview-page]")).toBeVisible();
	await page.waitForFunction(
		() => !document.querySelector("[data-gallery-preview-loading]"),
	);
	await page.evaluate(async () => {
		if ("fonts" in document) {
			await document.fonts.ready;
		}
	});
}

test.beforeEach(async ({ context }) => {
	await context.addInitScript(() => {
		let seed = 1337;
		Math.random = () => {
			seed = (seed * 48271) % 2147483647;
			return (seed - 1) / 2147483646;
		};

		Date.now = () => 1_700_000_000_000;

		try {
			Object.defineProperty(window.performance, "now", {
				configurable: true,
				value: () => 1000,
			});
		} catch {
			// Ignore environments where performance.now is not configurable.
		}
	});
});

for (const framework of frameworks) {
	test(`generates ${framework} gallery screenshots`, async ({ page }) => {
		const entries = await collectGalleryEntries(page, framework);
		expect(entries.length).toBeGreaterThan(0);
		const failedEntries: string[] = [];

		const outputDirectory = path.join(
			process.cwd(),
			"public",
			"component-gallery",
			framework,
		);
		await mkdir(outputDirectory, { recursive: true });

		for (const entry of entries) {
			try {
				await page.goto(entry.previewHref, {
					waitUntil: "domcontentloaded",
				});
				await waitForPreviewReady(page);
			} catch (error) {
				failedEntries.push(
					`${entry.id}: ${
						error instanceof Error ? error.message : String(error)
					}`,
				);
				continue;
			}

			const captureProfile = await page
				.locator("[data-gallery-preview-page]")
				.evaluate((element) => ({
					delayMs: Number(element.getAttribute("data-capture-delay-ms") ?? "0"),
					scrollY: Number(element.getAttribute("data-capture-scroll-y") ?? "0"),
				}));

			if (captureProfile.scrollY > 0) {
				await page.evaluate(
					(scrollY) => window.scrollTo(0, scrollY),
					captureProfile.scrollY,
				);
				await page.waitForTimeout(250);
			}

			if (captureProfile.delayMs > 0) {
				await page.waitForTimeout(captureProfile.delayMs);
			}

			await page.screenshot({
				path: path.join(outputDirectory, `${entry.id}.png`),
				scale: "css",
			});
		}

		expect(
			failedEntries,
			failedEntries.length
				? `Failed previews:\n${failedEntries.join("\n")}`
				: "All previews rendered successfully.",
		).toEqual([]);
	});
}
