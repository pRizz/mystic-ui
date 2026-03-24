import { type Component, type JSX } from "solid-js";
export interface AnimatedThemeTogglerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    duration?: number;
}
export declare const AnimatedThemeToggler: Component<AnimatedThemeTogglerProps>;
