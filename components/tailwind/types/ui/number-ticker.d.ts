import { type Component, type JSX } from "solid-js";
export interface NumberTickerProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    value?: number;
    startValue?: number;
    direction?: "up" | "down";
    delay?: number;
    decimalPlaces?: number;
}
export declare const NumberTicker: Component<NumberTickerProps>;
