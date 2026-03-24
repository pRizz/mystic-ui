import { type ParentComponent } from "solid-js";
export interface ShineBorderProps {
    borderRadius?: number;
    borderWidth?: number;
    class?: string;
    color?: string | string[];
    duration?: number;
}
export declare const ShineBorder: ParentComponent<ShineBorderProps>;
