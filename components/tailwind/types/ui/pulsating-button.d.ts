import { type JSX, type ParentComponent } from "solid-js";
export interface PulsatingButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    duration?: string;
    pulseColor?: string;
}
export declare const PulsatingButton: ParentComponent<PulsatingButtonProps>;
