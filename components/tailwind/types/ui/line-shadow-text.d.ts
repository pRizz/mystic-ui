import { type JSX } from "solid-js";
declare const motionElements: {
    readonly article: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLElement>>;
    readonly div: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLDivElement>>;
    readonly h1: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLHeadingElement>>;
    readonly h2: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLHeadingElement>>;
    readonly h3: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLHeadingElement>>;
    readonly h4: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLHeadingElement>>;
    readonly h5: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLHeadingElement>>;
    readonly h6: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLHeadingElement>>;
    readonly li: import("solid-motionone").MotionProxyComponent<JSX.LiHTMLAttributes<HTMLLIElement>>;
    readonly p: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLParagraphElement>>;
    readonly section: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLElement>>;
    readonly span: import("solid-motionone").MotionProxyComponent<JSX.HTMLAttributes<HTMLSpanElement>>;
};
type MotionElementType = keyof typeof motionElements;
export interface LineShadowTextProps extends JSX.HTMLAttributes<HTMLElement> {
    children: string;
    shadowColor?: string;
    as?: MotionElementType;
}
export declare const LineShadowText: (props: LineShadowTextProps) => JSX.Element;
export {};
