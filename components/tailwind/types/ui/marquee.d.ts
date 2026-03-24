import { type JSX, type ParentComponent } from "solid-js";
export interface MarqueeProps extends JSX.HTMLAttributes<HTMLDivElement> {
    pauseOnHover?: boolean;
    repeat?: number;
    reverse?: boolean;
    vertical?: boolean;
    duration?: number;
    gap?: string;
}
export declare const Marquee: ParentComponent<MarqueeProps>;
