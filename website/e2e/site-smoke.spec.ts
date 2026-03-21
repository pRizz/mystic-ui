import { type Page, expect, test } from "@playwright/test";

async function expectDarkMode(page: Page) {
	await expect
		.poll(() =>
			page.evaluate(() => document.documentElement.classList.contains("dark")),
		)
		.toBe(true);
}

test("loads the marketing site sections in both hosting modes", async ({
	page,
}) => {
	await page.goto("./");
	await expectDarkMode(page);
	await expect(
		page.getByRole("link", {
			name: "Explore Components",
		}),
	).toBeVisible();

	await page.goto("gallery");
	await expectDarkMode(page);
	await expect(
		page.getByRole("heading", {
			name: "Explore the component galleries and isolated demos.",
		}),
	).toBeVisible();

	await page.goto("gallery/panda");
	await expectDarkMode(page);
	const firstGalleryCard = page.locator("[data-gallery-card]").first();
	await expect(firstGalleryCard).toBeVisible();
	const maybeDemoHref =
		await firstGalleryCard.getAttribute("data-preview-href");
	expect(maybeDemoHref).toBeTruthy();

	await page.goto(maybeDemoHref ?? "demos/panda/accordion");
	await expectDarkMode(page);
	await expect(page.locator("[data-gallery-preview-page]")).toBeVisible();

	await page.goto("docs/panda");
	await expectDarkMode(page);
	await expect(
		page.getByRole("heading", {
			name: "Mystic UI",
		}),
	).toBeVisible();
});

test("uses light screenshot assets when a light theme is persisted", async ({
	page,
}) => {
	await page.addInitScript(() => {
		window.localStorage.setItem("theme", "light");
		window.localStorage.setItem("darkMode", JSON.stringify(false));
		document.documentElement.classList.remove("dark");
		document.documentElement.dataset.theme = "light";
		document.documentElement.style.colorScheme = "light";
	});

	await page.goto("gallery/panda");
	await expect
		.poll(() =>
			page.evaluate(() => document.documentElement.classList.contains("dark")),
		)
		.toBe(false);

	await expect(page.locator("[data-gallery-card] img").first()).toHaveAttribute(
		"src",
		/\.light\.png$/,
	);
});
