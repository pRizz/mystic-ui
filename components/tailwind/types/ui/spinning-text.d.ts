import { type JSX, type ParentComponent } from "solid-js";
import { type MotionComponentProps } from "solid-motionone";
type MotionTransition = NonNullable<MotionComponentProps["transition"]>;
type MotionVariants = NonNullable<MotionComponentProps["variants"]>;
export interface SpinningTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children: string | string[];
    duration?: number;
    reverse?: boolean;
    radius?: number;
    transition?: MotionTransition;
    variants?: {
        container?: MotionVariants;
        item?: MotionVariants;
    };
}
export declare const SpinningText: ParentComponent<SpinningTextProps>;
export {};
