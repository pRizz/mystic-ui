import { type ParentComponent } from "solid-js";
export interface BackgroundLinesProps extends Partial<SVGOptions> {
    class?: string;
}
export declare const BackgroundLines: ParentComponent<BackgroundLinesProps>;
interface SVGOptions {
    duration: number;
}
export {};
