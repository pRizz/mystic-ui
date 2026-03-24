import { type Component, type JSX } from "solid-js";
export interface DotPatternProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    cx?: number;
    cy?: number;
    cr?: number;
}
export declare const DotPattern: Component<DotPatternProps>;
