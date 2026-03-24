import { type JSX } from "solid-js";
import { type VariantDefinition } from "solid-motionone";
type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant = "fadeIn" | "blurIn" | "blurInUp" | "blurInDown" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleUp" | "scaleDown";
type MotionElementType = "article" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "li" | "p" | "section" | "span";
type VariantState = Exclude<VariantDefinition, string>;
type Variants = {
    hidden?: VariantState;
    show?: VariantDefinition;
    exit?: VariantDefinition;
};
export interface TextAnimateProps extends JSX.HTMLAttributes<HTMLElement> {
    children: string;
    class?: string;
    segmentClass?: string;
    delay?: number;
    duration?: number;
    variants?: Variants;
    as?: MotionElementType;
    by?: AnimationType;
    startOnView?: boolean;
    once?: boolean;
    animation?: AnimationVariant;
    accessible?: boolean;
}
export declare const TextAnimate: (props: TextAnimateProps) => JSX.Element;
export {};
