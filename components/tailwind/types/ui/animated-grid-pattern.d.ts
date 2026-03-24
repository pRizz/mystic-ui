import { type Component, type JSX } from "solid-js";
export interface AnimatedGridPatternProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: number;
    numSquares?: number;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
    class?: string;
}
export declare const AnimatedGridPattern: Component<AnimatedGridPatternProps>;
