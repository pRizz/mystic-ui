import { type JSX, type ParentComponent } from "solid-js";
export interface BlurInProps extends JSX.HTMLAttributes<HTMLDivElement> {
    blur?: string;
    duration?: number;
}
export declare const BlurIn: ParentComponent<BlurInProps>;
