import { makePersisted } from "@solid-primitives/storage";
import { createEffect, createSignal } from "solid-js";
import { css } from "styled-system/css";

const themeToggleClass = css({
	alignItems: "center",
	borderRadius: "l2",
	color: "fg.default",
	cursor: "pointer",
	display: "inline-flex",
	height: "8",
	justifyContent: "center",
	minWidth: "12",
	px: "3",
	transitionDuration: "normal",
	transitionProperty: "common",
	_hover: {
		backgroundColor: "bg.default",
	},
});

export const ThemeSwitcher = () => {
	const [darkMode, setDarkMode] = makePersisted(createSignal(false), {
		name: "darkMode",
	});

	createEffect(() => {
		if (darkMode()) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});

	return (
		<button
			type="button"
			onClick={() => setDarkMode((theme) => !theme)}
			aria-label="Toggle dark mode"
			class={themeToggleClass}
		>
			{darkMode() ? "Light" : "Dark"}
		</button>
	);
};
