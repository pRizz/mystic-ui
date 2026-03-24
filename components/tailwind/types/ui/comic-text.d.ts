import type { Component, JSX } from "solid-js";
export interface ComicTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children: string;
    fontSize?: number;
}
export declare const ComicText: Component<ComicTextProps>;
