import { type Component, type JSX, type ParentComponent } from "solid-js";
export interface BentoGridProps extends JSX.HTMLAttributes<HTMLDivElement> {
}
declare const BentoGrid: ParentComponent<BentoGridProps>;
export interface BentoCardProps {
    name: string;
    class?: string;
    background: JSX.Element;
    Icon: Component<{
        class: string;
    }>;
    description: string;
    href: string;
    cta: string;
}
declare const BentoCard: Component<BentoCardProps>;
export { BentoCard, BentoGrid };
