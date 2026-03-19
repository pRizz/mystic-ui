import { expect, test } from "@playwright/test";

test("loads the marketing site sections in both hosting modes", async ({
	page,
}) => {
	await page.goto("./");
	await expect(
		page.getByRole("link", {
			name: "Explore Components",
		}),
	).toBeVisible();

	await page.goto("gallery");
	await expect(
		page.getByRole("heading", {
			name: "Explore the component galleries and isolated demos.",
		}),
	).toBeVisible();

	await page.goto("gallery/panda");
	const firstGalleryCard = page.locator("[data-gallery-card]").first();
	await expect(firstGalleryCard).toBeVisible();
	const maybeDemoHref =
		await firstGalleryCard.getAttribute("data-preview-href");
	expect(maybeDemoHref).toBeTruthy();

	await page.goto(maybeDemoHref ?? "demos/panda/accordion");
	await expect(page.locator("[data-gallery-preview-page]")).toBeVisible();

	await page.goto("docs/panda");
	await expect(
		page.getByRole("heading", {
			name: "Mystic UI",
		}),
	).toBeVisible();
});
