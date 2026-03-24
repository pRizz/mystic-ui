import { type JSX, type ParentComponent } from "solid-js";
export declare const AnimatedListItem: ParentComponent;
export interface AnimatedListProps extends JSX.HTMLAttributes<HTMLDivElement> {
    delay?: number;
}
export declare const AnimatedList: ParentComponent<AnimatedListProps>;
