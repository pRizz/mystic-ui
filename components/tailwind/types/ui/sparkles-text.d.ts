import { type JSX, type ParentComponent } from "solid-js";
export interface SparklesTextProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    /** The colors of the sparkles */
    colors?: string[];
    /** The class of the text */
    class?: string;
    /** The number of sparkles */
    sparklesCount?: number;
}
export declare const SparklesText: ParentComponent<SparklesTextProps>;
