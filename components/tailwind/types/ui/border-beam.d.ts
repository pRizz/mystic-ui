import { type Component } from "solid-js";
export interface BorderBeamProps {
    anchor?: number;
    borderWidth?: number;
    class?: string;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
    duration?: number;
    size?: number;
}
export declare const BorderBeam: Component<BorderBeamProps>;
