import { type JSX, type ParentComponent } from "solid-js";
export interface AuroraTextProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    colors?: string[];
    speed?: number;
}
export declare const AuroraText: ParentComponent<AuroraTextProps>;
