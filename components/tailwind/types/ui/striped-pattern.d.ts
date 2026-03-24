import type { Component, JSX } from "solid-js";
export interface StripedPatternProps extends Omit<JSX.SvgSVGAttributes<SVGSVGElement>, "direction"> {
    direction?: "left" | "right";
}
export declare const StripedPattern: Component<StripedPatternProps>;
