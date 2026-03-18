import { Meta, Title } from "@solidjs/meta";
import type { RouteSectionProps } from "@solidjs/router";
import { For, createMemo } from "solid-js";
import { css } from "styled-system/css";
import { GalleryCard } from "~/components/gallery/gallery-card";
import { GalleryFrameworkSwitcher } from "~/components/gallery/gallery-framework-switcher";
import {
	type GalleryCategory,
	type GalleryEntry,
	getGallerySections,
} from "~/lib/component-gallery";
import type { ComponentFramework } from "~/lib/docs";

interface GallerySection {
	category: GalleryCategory;
	entries: readonly GalleryEntry[];
	title: string;
}

export default function GalleryPage(props: RouteSectionProps) {
	const framework = () => {
		const maybeFramework = props.params.framework;
		if (maybeFramework !== "tailwind" && maybeFramework !== "panda") {
			throw new Error("Invalid framework");
		}

		return maybeFramework as ComponentFramework;
	};

	const sections = createMemo<readonly GallerySection[]>(() =>
		getGallerySections(framework()),
	);
	const totalComponents = createMemo(() =>
		sections().reduce((count, section) => count + section.entries.length, 0),
	);

	return (
		<>
			<Title>{framework()} gallery | Mystic UI</Title>
			<Meta
				name="description"
				content={`Component gallery for ${framework()} with committed screenshots and lazy live previews.`}
			/>
			<div
				class={css({
					marginX: "auto",
					maxWidth: "7xl",
					px: "6",
					py: "10",
				})}
			>
				<div class={css({ display: "grid", gap: "10" })}>
					<div class={css({ display: "grid", gap: "4", maxWidth: "3xl" })}>
						<p
							class={css({
								color: "fg.muted",
								fontSize: "sm",
								fontWeight: "medium",
							})}
						>
							Component gallery
						</p>
						<h1
							class={css({
								fontSize: { base: "4xl", md: "5xl" },
								fontWeight: "black",
							})}
						>
							{framework() === "panda" ? "Panda" : "Tailwind"} component demo
							page
						</h1>
						<p class={css({ color: "fg.muted", fontSize: "lg" })}>
							Each framework gallery shows the components available for that
							framework as committed Playwright screenshots plus lazy live
							previews that load only when each card approaches the viewport.
						</p>
						<GalleryFrameworkSwitcher framework={framework()} />
						<p class={css({ color: "fg.muted", fontSize: "sm" })}>
							{totalComponents()} components in this framework.
						</p>
					</div>

					<div class={css({ display: "grid", gap: "10" })}>
						<For each={sections()}>
							{(section) => (
								<div class={css({ display: "grid", gap: "5" })}>
									<div class={css({ display: "grid", gap: "1" })}>
										<h2 class={css({ fontSize: "2xl", fontWeight: "bold" })}>
											{section.title}
										</h2>
										<p class={css({ color: "fg.muted", fontSize: "sm" })}>
											{section.entries.length} components
										</p>
									</div>
									<div class={css({ display: "grid", gap: "6" })}>
										<For each={section.entries}>
											{(entry) => <GalleryCard entry={entry} />}
										</For>
									</div>
								</div>
							)}
						</For>
					</div>
				</div>
			</div>
		</>
	);
}
