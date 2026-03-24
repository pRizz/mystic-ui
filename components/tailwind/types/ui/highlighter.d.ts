import type { JSX, ParentComponent } from "solid-js";
type AnnotationAction = "highlight" | "underline" | "box" | "circle" | "strike-through" | "crossed-off" | "bracket";
export interface HighlighterProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    action?: AnnotationAction;
    animationDuration?: number;
    color?: string;
    iterations?: number;
    isView?: boolean;
    multiline?: boolean;
    padding?: number;
    strokeWidth?: number;
}
export declare const Highlighter: ParentComponent<HighlighterProps>;
export {};
