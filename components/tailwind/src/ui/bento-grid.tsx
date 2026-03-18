import { cn } from "@/lib/utils";
import { TbArrowRight } from "solid-icons/tb";
import {
	type Component,
	type JSX,
	type ParentComponent,
	splitProps,
} from "solid-js";

export interface BentoGridProps extends JSX.HTMLAttributes<HTMLDivElement> {}

const BentoGrid: ParentComponent<BentoGridProps> = (props) => {
	const [localProps, forwardProps] = splitProps(props, ["class"]);
	return (
		<div
			class={cn(
				"grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
				localProps.class,
			)}
			{...forwardProps}
		>
			{props.children}
		</div>
	);
};

export interface BentoCardProps {
	name: string;
	class?: string;
	background: JSX.Element;
	Icon: Component<{ class: string }>;
	description: string;
	href: string;
	cta: string;
}

const BentoCard: Component<BentoCardProps> = (props) => {
	return (
		<div
			class={cn(
				"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				props.class,
			)}
		>
			<div>{props.background}</div>
			<div class="p-4">
				<div class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
					<props.Icon class="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
					<h3 class="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
						{props.name}
					</h3>
					<p class="max-w-lg text-neutral-400">{props.description}</p>
				</div>

				<div class="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden">
					<a
						href={props.href}
						class="pointer-events-auto inline-flex items-center p-0 text-sm font-medium"
					>
						{props.cta}
						<TbArrowRight class="ml-2 h-4 w-4" />
					</a>
				</div>
			</div>

			<div class="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
				<a
					href={props.href}
					class="pointer-events-auto inline-flex items-center p-0 text-sm font-medium"
				>
					{props.cta}
					<TbArrowRight class="ml-2 h-4 w-4" />
				</a>
			</div>

			<div class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
		</div>
	);
};

export { BentoCard, BentoGrid };
