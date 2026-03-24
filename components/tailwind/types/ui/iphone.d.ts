import { type Component, type JSX } from "solid-js";
export interface IphoneProps extends JSX.HTMLAttributes<HTMLDivElement> {
    src?: string;
    videoSrc?: string;
}
export declare const Iphone: Component<IphoneProps>;
