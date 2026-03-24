import { type Component, type JSX } from "solid-js";
export interface LightRaysProps extends JSX.HTMLAttributes<HTMLDivElement> {
    blur?: number;
    color?: string;
    count?: number;
    length?: string;
    speed?: number;
}
export declare const LightRays: Component<LightRaysProps>;
