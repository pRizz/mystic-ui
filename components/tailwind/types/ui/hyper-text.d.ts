import type { JSX } from "solid-js";
type CharacterSet = string[] | readonly string[];
type MotionElementType = "article" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "li" | "p" | "section" | "span";
export interface HyperTextProps extends JSX.HTMLAttributes<HTMLElement> {
    children: string;
    duration?: number;
    delay?: number;
    as?: MotionElementType;
    startOnView?: boolean;
    animateOnHover?: boolean;
    characterSet?: CharacterSet;
}
export declare const HyperText: (props: HyperTextProps) => JSX.Element;
export {};
