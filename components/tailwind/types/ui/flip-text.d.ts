import { type VariantDefinition } from "solid-motionone";
import { type Component } from "solid-js";
export interface FlipTextProps {
    text: string;
    duration?: number;
    delayMultiple?: number;
    states?: {
        initial: VariantDefinition;
        animate: VariantDefinition;
    };
    class?: string;
}
export declare const FlipText: Component<FlipTextProps>;
