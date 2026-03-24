import { type JSX, type ParentComponent } from "solid-js";
export interface ShimmerButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    background?: string;
    borderRadius?: string;
    class?: string;
    shimmerColor?: string;
    shimmerDuration?: string;
    shimmerSize?: string;
}
export declare const ShimmerButton: ParentComponent<ShimmerButtonProps>;
