import { type JSX } from "solid-js";
export interface AndroidProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    src?: string;
    videoSrc?: string;
}
export declare function Android(props: AndroidProps): JSX.Element;
