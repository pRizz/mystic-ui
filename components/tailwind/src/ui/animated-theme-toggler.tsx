import { TbOutlineMoon, TbOutlineSun } from "solid-icons/tb";
import {
	type Component,
	type JSX,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import { cn } from "../lib/utils";

interface ViewTransitionDocument extends Document {
	startViewTransition?: (callback: () => void) => {
		ready?: Promise<unknown>;
	};
}

export interface AnimatedThemeTogglerProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	duration?: number;
}

export const AnimatedThemeToggler: Component<AnimatedThemeTogglerProps> = (
	props,
) => {
	const [localProps, forwardProps] = splitProps(props, [
		"class",
		"duration",
		"type",
	]);
	const [isDark, setIsDark] = createSignal(false);
	let buttonRef: HTMLButtonElement | undefined;

	const syncThemeState = () => {
		setIsDark(document.documentElement.classList.contains("dark"));
	};

	const applyTheme = () => {
		const nextTheme = !isDark();
		setIsDark(nextTheme);
		document.documentElement.classList.toggle("dark", nextTheme);
		localStorage.setItem("theme", nextTheme ? "dark" : "light");
		localStorage.setItem("darkMode", JSON.stringify(nextTheme));
	};

	const toggleTheme = () => {
		if (!buttonRef) {
			return;
		}

		const viewTransitionDocument = document as ViewTransitionDocument;
		const { top, left, width, height } = buttonRef.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
		const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
		const maxRadius = Math.hypot(
			Math.max(x, viewportWidth - x),
			Math.max(y, viewportHeight - y),
		);

		if (typeof viewTransitionDocument.startViewTransition !== "function") {
			applyTheme();
			return;
		}

		const transition = viewTransitionDocument.startViewTransition(() => {
			applyTheme();
		});

		transition.ready?.then(() => {
			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${maxRadius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: localProps.duration ?? 400,
					easing: "ease-in-out",
					pseudoElement: "::view-transition-new(root)",
				},
			);
		});
	};

	onMount(() => {
		syncThemeState();

		const observer = new MutationObserver(syncThemeState);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		onCleanup(() => observer.disconnect());
	});

	createEffect(() => {
		syncThemeState();
	});

	return (
		<button
			type={localProps.type ?? "button"}
			ref={buttonRef}
			onClick={toggleTheme}
			class={cn(localProps.class)}
			{...forwardProps}
		>
			<style>
				{
					"::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }"
				}
			</style>
			{isDark() ? <TbOutlineSun /> : <TbOutlineMoon />}
			<span class="sr-only">Toggle theme</span>
		</button>
	);
};
