export type ThemeMode = "light" | "dark";

export const themeStorageKeys = {
	darkMode: "darkMode",
	theme: "theme",
} as const;

export const defaultThemeMode: ThemeMode = "dark";

function parseDarkModeValue(maybeDarkModeValue: string | null) {
	if (maybeDarkModeValue === null) {
		return undefined;
	}

	if (maybeDarkModeValue === "true") {
		return "dark" satisfies ThemeMode;
	}

	if (maybeDarkModeValue === "false") {
		return "light" satisfies ThemeMode;
	}

	try {
		const parsedDarkMode = JSON.parse(maybeDarkModeValue);
		if (parsedDarkMode === true) {
			return "dark" satisfies ThemeMode;
		}

		if (parsedDarkMode === false) {
			return "light" satisfies ThemeMode;
		}
	} catch {}

	return undefined;
}

export function parseStoredThemeMode(
	maybeThemeValue: string | null,
	maybeDarkModeValue: string | null,
): ThemeMode | undefined {
	if (maybeThemeValue === "dark" || maybeThemeValue === "light") {
		return maybeThemeValue;
	}

	return parseDarkModeValue(maybeDarkModeValue);
}

export function getStoredThemeMode(storage: Pick<Storage, "getItem">): ThemeMode {
	return (
		parseStoredThemeMode(
			storage.getItem(themeStorageKeys.theme),
			storage.getItem(themeStorageKeys.darkMode),
		) ?? defaultThemeMode
	);
}

export function getThemeModeFromDocument(
	root: Pick<HTMLElement, "classList">,
): ThemeMode {
	return root.classList.contains("dark") ? "dark" : "light";
}

export function getInitialThemeMode(): ThemeMode {
	if (typeof document === "undefined") {
		return defaultThemeMode;
	}

	return getThemeModeFromDocument(document.documentElement);
}

export function applyThemeMode(
	mode: ThemeMode,
	root: HTMLElement = document.documentElement,
) {
	root.classList.toggle("dark", mode === "dark");
	root.dataset.theme = mode;
	root.style.colorScheme = mode;
}

export function persistThemeMode(
	mode: ThemeMode,
	storage: Pick<Storage, "setItem"> = window.localStorage,
) {
	storage.setItem(themeStorageKeys.theme, mode);
	storage.setItem(themeStorageKeys.darkMode, JSON.stringify(mode === "dark"));
}

export function createThemeBootstrapScript() {
	const defaultMode = JSON.stringify(defaultThemeMode);
	const darkModeStorageKey = JSON.stringify(themeStorageKeys.darkMode);
	const themeStorageKey = JSON.stringify(themeStorageKeys.theme);

	return `
		(() => {
			const root = document.documentElement;
			const applyTheme = (mode) => {
				const isDark = mode === "dark";
				root.classList.toggle("dark", isDark);
				root.dataset.theme = mode;
				root.style.colorScheme = mode;
			};

			try {
				const storedTheme = window.localStorage.getItem(${themeStorageKey});
				const storedDarkMode = window.localStorage.getItem(${darkModeStorageKey});
				let mode;

				if (storedTheme === "dark" || storedTheme === "light") {
					mode = storedTheme;
				} else if (storedDarkMode === "true" || storedDarkMode === "false") {
					mode = storedDarkMode === "true" ? "dark" : "light";
				} else if (storedDarkMode !== null) {
					try {
						const parsedDarkMode = JSON.parse(storedDarkMode);
						if (parsedDarkMode === true || parsedDarkMode === false) {
							mode = parsedDarkMode ? "dark" : "light";
						}
					} catch {}
				}

				applyTheme(mode ?? ${defaultMode});
			} catch {
				applyTheme(${defaultMode});
			}
		})();
	`;
}
