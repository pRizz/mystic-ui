import { type JSX, type ParentComponent } from "solid-js";
export interface AnimatedGradientTextProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    speed?: number;
    colorFrom?: string;
    colorTo?: string;
}
export declare const AnimatedGradientText: ParentComponent<AnimatedGradientTextProps>;
