import { type Component, type JSX } from "solid-js";
export interface FlickeringGridProps extends JSX.HTMLAttributes<HTMLDivElement> {
    color?: string;
    flickerChance?: number;
    gridGap?: number;
    height?: number;
    maxOpacity?: number;
    squareSize?: number;
    width?: number;
}
export declare const FlickeringGrid: Component<FlickeringGridProps>;
