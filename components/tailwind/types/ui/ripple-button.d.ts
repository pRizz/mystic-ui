import { type JSX, type ParentComponent } from "solid-js";
export interface RippleButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    duration?: string;
    rippleColor?: string;
}
export declare const RippleButton: ParentComponent<RippleButtonProps>;
