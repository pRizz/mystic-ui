import { type Component } from "solid-js";
export interface RippleProps {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
    class?: string;
}
export declare const Ripple: Component<RippleProps>;
