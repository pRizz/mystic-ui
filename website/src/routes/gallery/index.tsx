import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import { css } from "styled-system/css";
import { getGalleryEntries } from "~/lib/component-gallery";
import type { ComponentFramework } from "~/lib/docs";

const frameworks: {
	description: string;
	framework: ComponentFramework;
	href: string;
	label: string;
}[] = [
	{
		description:
			"Preview the PandaCSS component set with committed screenshots and live demos.",
		framework: "panda",
		href: "/gallery/panda",
		label: "Panda gallery",
	},
	{
		description:
			"Browse the Tailwind component set with the same static captures and isolated demos.",
		framework: "tailwind",
		href: "/gallery/tailwind",
		label: "Tailwind gallery",
	},
];

export default function GalleryIndexPage() {
	return (
		<>
			<Title>Gallery | Mystic UI</Title>
			<Meta
				name="description"
				content="Browse Mystic UI galleries for PandaCSS and Tailwind, with committed screenshots and isolated demos for each component."
			/>
			<div
				class={css({
					marginX: "auto",
					maxWidth: "7xl",
					px: "6",
					py: "12",
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
							Explore the component galleries and isolated demos.
						</h1>
						<p class={css({ color: "fg.muted", fontSize: "lg" })}>
							Each framework page pairs committed screenshots with embedded live
							demos so GitHub Pages stays fast while individual components
							remain easy to inspect.
						</p>
					</div>

					<div
						class={css({
							display: "grid",
							gap: "6",
							gridTemplateColumns: {
								base: "1fr",
								lg: "repeat(2, minmax(0, 1fr))",
							},
						})}
					>
						<For each={frameworks}>
							{(framework) => (
								<A
									href={framework.href}
									class={css({
										backgroundColor: "bg.canvas",
										borderColor: "border.default",
										borderRadius: "3xl",
										borderWidth: "1px",
										boxShadow: "sm",
										display: "grid",
										gap: "4",
										p: "6",
										textDecoration: "none",
										transitionDuration: "normal",
										transitionProperty: "common",
										_hover: {
											borderColor: "border.accent",
											boxShadow: "md",
											transform: "translateY(-2px)",
										},
									})}
								>
									<div class={css({ display: "grid", gap: "1" })}>
										<p
											class={css({
												color: "fg.muted",
												fontSize: "sm",
												fontWeight: "medium",
												textTransform: "uppercase",
											})}
										>
											{framework.framework}
										</p>
										<h2
											class={css({
												fontSize: "2xl",
												fontWeight: "bold",
											})}
										>
											{framework.label}
										</h2>
									</div>
									<p class={css({ color: "fg.muted", fontSize: "sm" })}>
										{framework.description}
									</p>
									<p class={css({ fontSize: "sm", fontWeight: "medium" })}>
										{getGalleryEntries(framework.framework).length} components
										available
									</p>
								</A>
							)}
						</For>
					</div>
				</div>
			</div>
		</>
	);
}
