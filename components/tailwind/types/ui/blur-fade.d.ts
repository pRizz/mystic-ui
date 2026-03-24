import { type JSX, type ParentComponent } from "solid-js";
type Direction = "up" | "down" | "left" | "right";
type BlurFadeVariantState = {
    filter?: string;
    opacity?: number;
    x?: number;
    y?: number;
};
export interface BlurFadeProps extends JSX.HTMLAttributes<HTMLDivElement> {
    blur?: string;
    delay?: number;
    direction?: Direction;
    duration?: number;
    inView?: boolean;
    inViewMargin?: string;
    variant?: {
        hidden: BlurFadeVariantState;
        visible: BlurFadeVariantState;
    };
}
export declare const BlurFade: ParentComponent<BlurFadeProps>;
export {};
