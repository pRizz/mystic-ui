import { type ParentComponent } from "solid-js";
export interface OrbitingCirclesProps {
    duration?: number;
    delay?: number;
    radius?: number;
    path?: boolean;
    reverse?: boolean;
    class?: string;
}
export declare const OrbitingCircles: ParentComponent<OrbitingCirclesProps>;
