import { type JSX, type ParentComponent } from "solid-js";
export interface DockProps extends JSX.HTMLAttributes<HTMLDivElement> {
    magnification?: number;
    distance?: number;
}
export declare const Dock: ParentComponent<DockProps>;
export interface DockIconProps extends JSX.HTMLAttributes<HTMLDivElement> {
}
export declare const DockIcon: ParentComponent<DockIconProps>;
