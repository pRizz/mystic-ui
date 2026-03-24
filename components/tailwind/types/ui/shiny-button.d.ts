import type { JSX, ParentComponent } from "solid-js";
import { type MotionComponentProps } from "solid-motionone";
export interface ShinyButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>, Omit<MotionComponentProps, "children"> {
}
export declare const ShinyButton: ParentComponent<ShinyButtonProps>;
