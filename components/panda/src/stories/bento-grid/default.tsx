import {
	TbBell,
	TbCalendar,
	TbCursorText,
	TbFileText,
	TbGlobe,
} from "solid-icons/tb";
import { For } from "solid-js";
import { css } from "styled-system/css";

import { BentoCard, BentoGrid } from "@/ui/bento-grid";

const features = [
	{
		Icon: TbFileText,
		name: "Save your files",
		description: "We automatically save your files as you type.",
		href: "/",
		cta: "Learn more",
		background: (
			<img
				class={css({
					position: "absolute",
					right: "-20",
					top: "-20",
					opacity: "0.6",
				})}
				aria-hidden="true"
				alt="bg"
			/>
		),
		class: css({
			lg: {
				gridRow: "1 / 4",
				gridColumn: "2 / 3",
			},
		}),
	},
	{
		Icon: TbCursorText,
		name: "Full text search",
		description: "Search through all your files in one place.",
		href: "/",
		cta: "Learn more",
		background: (
			<img
				class={css({
					position: "absolute",
					right: "-20",
					top: "-20",
					opacity: "0.6",
				})}
				aria-hidden="true"
				alt="bg"
			/>
		),
		class: css({
			lg: {
				gridColumn: "1 / 2",
				gridRow: "1 / 3",
			},
		}),
	},
	{
		Icon: TbGlobe,
		name: "Multilingual",
		description: "Supports 100+ languages and counting.",
		href: "/",
		cta: "Learn more",
		background: (
			<img
				class={css({
					position: "absolute",
					right: "-20",
					top: "-20",
					opacity: "0.6",
				})}
				aria-hidden="true"
				alt="bg"
			/>
		),
		class: css({
			lg: {
				gridColumn: "1 / 2",
				gridRow: "3 / 4",
			},
		}),
	},
	{
		Icon: TbCalendar,
		name: "Calendar",
		description: "Use the calendar to filter your files by date.",
		href: "/",
		cta: "Learn more",
		background: (
			<img
				class={css({
					position: "absolute",
					right: "-20",
					top: "-20",
					opacity: "0.6",
				})}
				aria-hidden="true"
				alt="bg"
			/>
		),
		class: css({
			lg: {
				gridColumn: "3 / 4",
				gridRow: "1 / 2",
			},
		}),
	},
	{
		Icon: TbBell,
		name: "Notifications",
		description:
			"Get notified when someone shares a file or mentions you in a comment.",
		href: "/",
		cta: "Learn more",
		background: (
			<img
				class={css({
					position: "absolute",
					right: "-20",
					top: "-20",
					opacity: "0.6",
				})}
				aria-hidden="true"
				alt="bg"
			/>
		),
		class: css({
			lg: {
				gridColumn: "3 / 4",
				gridRow: "2 / 4",
			},
		}),
	},
];

export default function BentoDemo() {
	return (
		<BentoGrid
			class={css({
				lg: {
					gridTemplateRows: "repeat(3, minmax(0, 1fr))",
				},
			})}
		>
			<For each={features}>{(feature) => <BentoCard {...feature} />}</For>
		</BentoGrid>
	);
}
