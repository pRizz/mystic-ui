import { type Component } from "solid-js";
export interface SparklesProps {
    id?: string;
    class?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleColor?: string;
    particleDensity?: number;
}
export declare const SparklesCore: Component<SparklesProps>;
