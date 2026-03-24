import { type Component, type JSX } from "solid-js";
export interface AnimatedCircularProgressBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
    max?: number;
    min?: number;
    value: number;
    gaugePrimaryColor: string;
    gaugeSecondaryColor: string;
}
export declare const AnimatedCircularProgressBar: Component<AnimatedCircularProgressBarProps>;
