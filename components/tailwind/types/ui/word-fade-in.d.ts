import { type Component, type JSX } from "solid-js";
export interface WordFadeInProps extends JSX.HTMLAttributes<HTMLDivElement> {
    text: string;
    delay?: number;
    duration?: number;
    blur?: number;
}
export declare const WordFadeIn: Component<WordFadeInProps>;
