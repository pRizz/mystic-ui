import { cn } from "@/lib/utils";
import type { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Motion } from "solid-motionone";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
	| "fadeIn"
	| "blurIn"
	| "blurInUp"
	| "blurInDown"
	| "slideUp"
	| "slideDown"
	| "slideLeft"
	| "slideRight"
	| "scaleUp"
	| "scaleDown";
type MotionElementType =
	| "article"
	| "div"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "li"
	| "p"
	| "section"
	| "span";
type VariantState = Record<string, unknown>;
type Variants = {
	hidden?: VariantState;
	show?: VariantState;
	exit?: VariantState;
};

const motionElements = {
	article: Motion.article,
	div: Motion.div,
	h1: Motion.h1,
	h2: Motion.h2,
	h3: Motion.h3,
	h4: Motion.h4,
	h5: Motion.h5,
	h6: Motion.h6,
	li: Motion.li,
	p: Motion.p,
	section: Motion.section,
	span: Motion.span,
} as const satisfies Record<MotionElementType, unknown>;

const staggerTimings: Record<AnimationType, number> = {
	text: 0.06,
	word: 0.05,
	character: 0.03,
	line: 0.06,
};

const animationVariants: Record<AnimationVariant, Variants> = {
	fadeIn: {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 20 },
	},
	blurIn: {
		hidden: { opacity: 0, filter: "blur(10px)" },
		show: { opacity: 1, filter: "blur(0px)" },
		exit: { opacity: 0, filter: "blur(10px)" },
	},
	blurInUp: {
		hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
		show: { opacity: 1, filter: "blur(0px)", y: 0 },
		exit: { opacity: 0, filter: "blur(10px)", y: 20 },
	},
	blurInDown: {
		hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
		show: { opacity: 1, filter: "blur(0px)", y: 0 },
	},
	slideUp: {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 },
		exit: { y: -20, opacity: 0 },
	},
	slideDown: {
		hidden: { y: -20, opacity: 0 },
		show: { y: 0, opacity: 1 },
		exit: { y: 20, opacity: 0 },
	},
	slideLeft: {
		hidden: { x: 20, opacity: 0 },
		show: { x: 0, opacity: 1 },
		exit: { x: -20, opacity: 0 },
	},
	slideRight: {
		hidden: { x: -20, opacity: 0 },
		show: { x: 0, opacity: 1 },
		exit: { x: 20, opacity: 0 },
	},
	scaleUp: {
		hidden: { scale: 0.5, opacity: 0 },
		show: { scale: 1, opacity: 1 },
		exit: { scale: 0.5, opacity: 0 },
	},
	scaleDown: {
		hidden: { scale: 1.5, opacity: 0 },
		show: { scale: 1, opacity: 1 },
		exit: { scale: 1.5, opacity: 0 },
	},
};

function splitSegments(text: string, by: AnimationType) {
	switch (by) {
		case "word":
			return text.split(/(\s+)/);
		case "character":
			return text.split("");
		case "line":
			return text.split("\n");
		default:
			return [text];
	}
}

function getSegmentClass(by: AnimationType, segmentClass?: string) {
	return cn(
		by === "line" ? "block" : "inline-block whitespace-pre",
		segmentClass,
	);
}

export interface TextAnimateProps extends JSX.HTMLAttributes<HTMLElement> {
	children: string;
	class?: string;
	segmentClass?: string;
	delay?: number;
	duration?: number;
	variants?: Variants;
	as?: MotionElementType;
	by?: AnimationType;
	startOnView?: boolean;
	once?: boolean;
	animation?: AnimationVariant;
	accessible?: boolean;
}

export const TextAnimate = (props: TextAnimateProps) => {
	const MotionComponent = motionElements[props.as ?? "p"];
	const by = props.by ?? "word";
	const segments = splitSegments(props.children, by);
	const itemVariants =
		props.variants ?? animationVariants[props.animation ?? "fadeIn"];
	const delay = props.delay ?? 0;
	const duration = props.duration ?? 0.3;
	const startOnView = props.startOnView ?? true;
	const once = props.once ?? false;
	const accessible = props.accessible ?? true;
	const stagger = duration / Math.max(segments.length, 1);
	const seenSegments = new Map<string, number>();
	const segmentEntries = segments.map((segment) => {
		const seenCount = (seenSegments.get(segment) ?? 0) + 1;
		seenSegments.set(segment, seenCount);

		return {
			key: `${by}-${segment}-${seenCount}`,
			segment,
		};
	});

	return (
		<Dynamic
			component={MotionComponent as never}
			class={cn("whitespace-pre-wrap", props.class)}
			aria-label={accessible ? props.children : undefined}
		>
			{accessible ? <span class="sr-only">{props.children}</span> : null}
			{segmentEntries.map(({ key, segment }, index) => (
				<Motion.span
					key={key}
					initial={itemVariants.hidden}
					inView={startOnView ? itemVariants.show : undefined}
					animate={startOnView ? undefined : itemVariants.show}
					exit={itemVariants.exit}
					inViewOptions={{ once }}
					transition={{
						delay: delay + index * staggerTimings[by],
						duration: stagger || duration,
					}}
					class={getSegmentClass(by, props.segmentClass)}
					aria-hidden={accessible ? "true" : undefined}
				>
					{segment}
				</Motion.span>
			))}
		</Dynamic>
	);
};
