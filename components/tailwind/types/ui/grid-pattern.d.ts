import { type Component } from "solid-js";
export interface GridPatternProps {
    class?: string;
    height?: number;
    squares?: Array<[x: number, y: number]>;
    strokeDasharray?: string;
    width?: number;
    x?: number;
    y?: number;
}
export declare const GridPattern: Component<GridPatternProps>;
