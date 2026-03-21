import { css } from "styled-system/css";
import { useTheme } from "./theme-provider";

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
	const theme = useTheme();

	return (
		<button
			type="button"
			onClick={theme.toggleMode}
			aria-label="Toggle dark mode"
			class={themeToggleClass}
		>
			{theme.isDark() ? "Light" : "Dark"}
		</button>
	);
};
