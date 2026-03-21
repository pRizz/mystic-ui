import {
	type Accessor,
	type ParentComponent,
	createContext,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from "solid-js";
import {
	applyThemeMode,
	getInitialThemeMode,
	getStoredThemeMode,
	getThemeModeFromDocument,
	persistThemeMode,
	type ThemeMode,
	themeStorageKeys,
} from "~/lib/theme";

interface ThemeContextValue {
	isDark: Accessor<boolean>;
	mode: Accessor<ThemeMode>;
	setMode: (nextMode: ThemeMode) => void;
	toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue>();

export const ThemeProvider: ParentComponent = (props) => {
	const [mode, setMode] = createSignal<ThemeMode>(getInitialThemeMode());
	const isDark = createMemo(() => mode() === "dark");

	createEffect(() => {
		if (typeof document === "undefined" || typeof window === "undefined") {
			return;
		}

		const currentMode = mode();
		applyThemeMode(currentMode);
		persistThemeMode(currentMode);
	});

	onMount(() => {
		const syncThemeMode = () => {
			setMode(getThemeModeFromDocument(document.documentElement));
		};

		const observer = new MutationObserver(() => {
			syncThemeMode();
		});

		observer.observe(document.documentElement, {
			attributeFilter: ["class"],
			attributes: true,
		});

		const handleStorage = (event: StorageEvent) => {
			if (
				event.key &&
				event.key !== themeStorageKeys.theme &&
				event.key !== themeStorageKeys.darkMode
			) {
				return;
			}

			setMode(getStoredThemeMode(window.localStorage));
		};

		window.addEventListener("storage", handleStorage);
		syncThemeMode();

		onCleanup(() => {
			observer.disconnect();
			window.removeEventListener("storage", handleStorage);
		});
	});

	const setThemeMode = (nextMode: ThemeMode) => {
		setMode(nextMode);
	};

	const toggleMode = () => {
		setMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
	};

	return (
		<ThemeContext.Provider
			value={{
				isDark,
				mode,
				setMode: setThemeMode,
				toggleMode,
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	);
};

export function useTheme() {
	const maybeThemeContext = useContext(ThemeContext);
	if (!maybeThemeContext) {
		throw new Error("Theme context is not available.");
	}

	return maybeThemeContext;
}
