import { cn } from "@/lib/utils";
import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";

const sizeClasses = {
	default: "h-9 px-4 py-2",
	sm: "h-8 rounded-xl px-3 text-xs",
	lg: "h-11 rounded-xl px-8",
	icon: "size-9",
} as const;

const variantClasses = {
	default:
		"border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] text-primary-foreground dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
	outline:
		"border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] text-accent-foreground dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
} as const;

export interface RainbowButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: keyof typeof sizeClasses;
	variant?: keyof typeof variantClasses;
}

export const RainbowButton: ParentComponent<RainbowButtonProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"size",
		"variant",
		"style",
	]);
	const localProps = mergeProps(
		{
			size: "default" as const,
			variant: "default" as const,
		},
		_localProps,
	);
	const style = () =>
		typeof localProps.style === "string"
			? `--color-1:hsl(0 100% 63%);--color-2:hsl(270 100% 63%);--color-3:hsl(210 100% 63%);--color-4:hsl(195 100% 63%);--color-5:hsl(90 100% 63%);${localProps.style}`
			: {
					"--color-1": "hsl(0 100% 63%)",
					"--color-2": "hsl(270 100% 63%)",
					"--color-3": "hsl(210 100% 63%)",
					"--color-4": "hsl(195 100% 63%)",
					"--color-5": "hsl(90 100% 63%)",
					...localProps.style,
				};

	return (
		<button
			data-slot="button"
			class={cn(
				"group relative inline-flex shrink-0 animate-rainbow cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 text-sm font-medium before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.75rem)]",
				sizeClasses[localProps.size],
				variantClasses[localProps.variant],
				localProps.class,
			)}
			style={style()}
			{...forwardProps}
			ref={forwardProps.ref}
		>
			{localProps.children}
		</button>
	);
};
