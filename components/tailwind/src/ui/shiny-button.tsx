import type { JSX, ParentComponent } from "solid-js";
import { Motion, type MotionComponentProps } from "solid-motionone";
import { cn } from "../lib/utils";

const animationProps = {
	initial: { "--x": "100%" },
	animate: { "--x": "-100%" },
	transition: {
		repeat: Number.POSITIVE_INFINITY,
		duration: 1.5,
		easing: "linear",
		endDelay: 1,
	},
} satisfies Omit<MotionComponentProps, "children">;

export interface ShinyButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
		Omit<MotionComponentProps, "children"> {}

export const ShinyButton: ParentComponent<ShinyButtonProps> = (props) => {
	return (
		<Motion.button
			class={cn(
				"relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow active:scale-95 dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]",
				props.class,
			)}
			{...animationProps}
			{...props}
		>
			<span
				class="relative block size-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
				style={{
					"mask-image":
						"linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
				}}
			>
				{props.children}
			</span>
			<span
				style={{
					mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
					"-webkit-mask":
						"linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
					"background-image":
						"linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))",
				}}
				class="absolute inset-0 z-10 block rounded-[inherit] p-px"
			/>
		</Motion.button>
	);
};
