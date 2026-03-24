import { type Component, type JSX } from "solid-js";
export interface SafariProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
    url?: string;
    src?: string;
    width?: number;
    height?: number;
}
export declare const Safari: Component<SafariProps>;
