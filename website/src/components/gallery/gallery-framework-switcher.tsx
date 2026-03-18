import { type Component, For } from "solid-js";
import { css, cx } from "styled-system/css";
import type { ComponentFramework } from "~/lib/docs";

interface GalleryFrameworkSwitcherProps {
	framework: ComponentFramework;
}

const frameworkOptions: {
	href: string;
	label: string;
	value: ComponentFramework;
}[] = [
	{
		href: "/gallery/panda",
		label: "Panda preview set",
		value: "panda",
	},
	{
		href: "/gallery/tailwind",
		label: "Tailwind preview set",
		value: "tailwind",
	},
];

export const GalleryFrameworkSwitcher: Component<
	GalleryFrameworkSwitcherProps
> = (props) => {
	return (
		<div class={css({ display: "flex", flexWrap: "wrap", gap: "2" })}>
			<For each={frameworkOptions}>
				{(option) => (
					<a
						href={option.href}
						aria-current={props.framework === option.value ? "page" : undefined}
						class={cx(
							css({
								borderRadius: "full",
								borderWidth: "1px",
								borderColor: "border.default",
								color: "fg.muted",
								fontSize: "sm",
								fontWeight: "medium",
								px: "4",
								py: "2",
								transitionDuration: "normal",
								transitionProperty: "common",
								_hover: {
									borderColor: "border.accent",
									color: "fg.default",
								},
							}),
							props.framework === option.value &&
								css({
									backgroundColor: "bg.default",
									borderColor: "border.accent",
									boxShadow: "sm",
									color: "fg.default",
								}),
						)}
					>
						{option.label}
					</a>
				)}
			</For>
		</div>
	);
};
