import { type Component, type JSX } from "solid-js";
import { type MotionComponentProps } from "solid-motionone";
export interface WordRotateProps extends JSX.HTMLAttributes<HTMLDivElement>, Omit<MotionComponentProps, "children"> {
    words: string[];
    duration?: number;
}
export declare const WordRotate: Component<WordRotateProps>;
