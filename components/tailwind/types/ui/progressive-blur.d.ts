import { type Component, type JSX } from "solid-js";
export interface ProgressiveBlurProps extends JSX.HTMLAttributes<HTMLDivElement> {
    blurLevels?: number[];
    height?: string;
    position?: "top" | "bottom" | "both";
}
export declare const ProgressiveBlur: Component<ProgressiveBlurProps>;
