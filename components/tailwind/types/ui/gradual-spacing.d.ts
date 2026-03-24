import { type Options } from "solid-motionone";
import { type Component } from "solid-js";
export interface GradualSpacingProps {
    text: string;
    duration?: number;
    delayMultiple?: number;
    states?: {
        hidden: Options["exit"];
        visible: Options["inView"];
    };
    class?: string;
}
export declare const GradualSpacing: Component<GradualSpacingProps>;
