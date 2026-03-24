import { type Component, type JSX } from "solid-js";
export interface NoSignalScreenProps extends JSX.CanvasHTMLAttributes<HTMLCanvasElement> {
    frameRate?: number;
}
export declare const NoSignalScreen: Component<NoSignalScreenProps>;
