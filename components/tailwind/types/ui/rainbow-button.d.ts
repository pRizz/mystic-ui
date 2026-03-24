import { type JSX, type ParentComponent } from "solid-js";
declare const sizeClasses: {
    readonly default: "h-9 px-4 py-2";
    readonly sm: "h-8 rounded-xl px-3 text-xs";
    readonly lg: "h-11 rounded-xl px-8";
    readonly icon: "size-9";
};
declare const variantClasses: {
    readonly default: "border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] text-primary-foreground dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]";
    readonly outline: "border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] text-accent-foreground dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]";
};
export interface RainbowButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: keyof typeof sizeClasses;
    variant?: keyof typeof variantClasses;
}
export declare const RainbowButton: ParentComponent<RainbowButtonProps>;
export {};
