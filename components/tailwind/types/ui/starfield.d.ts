import { type Component, type JSX } from "solid-js";
export interface StarfieldProps extends JSX.CanvasHTMLAttributes<HTMLCanvasElement> {
    background?: string;
    color?: string;
    quantity?: number;
    size?: number;
    speed?: number;
}
export declare const Starfield: Component<StarfieldProps>;
