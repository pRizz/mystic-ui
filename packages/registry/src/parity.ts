export type ParityStatus = "partial" | "missing" | "exception";
export type ParityCategory =
	| "widget"
	| "text"
	| "background"
	| "interactive"
	| "media";
export type Framework = "tailwind" | "panda";
export type ForkOnlyAction = "keep" | "map-to-upstream" | "deprecate";

export interface FrameworkSupport {
	tailwind: boolean;
	panda: boolean;
	docs: boolean;
	storyTailwind: boolean;
	storyPanda: boolean;
	registryTailwind: boolean;
	registryPanda: boolean;
}

export interface UpstreamComponentParityEntry {
	id: string;
	category: ParityCategory;
	status: ParityStatus;
	support: FrameworkSupport;
	notes?: readonly string[];
	exceptionReason?: string;
}

export interface ForkOnlyComponentEntry {
	id: string;
	frameworks: readonly Framework[];
	docs: boolean;
	recommendedAction: ForkOnlyAction;
	upstreamReplacement?: string;
	notes?: readonly string[];
}

export interface ParityExceptionEntry {
	id: string;
	reason: string;
	scope: "component" | "website" | "workflow";
}

function createSupport(
	tailwind: boolean,
	panda: boolean,
	docs: boolean,
): FrameworkSupport {
	return {
		tailwind,
		panda,
		docs,
		storyTailwind: tailwind,
		storyPanda: panda,
		registryTailwind: tailwind,
		registryPanda: panda,
	};
}

function createEntry(
	id: string,
	category: ParityCategory,
	status: ParityStatus,
	support: FrameworkSupport,
	notes?: readonly string[],
	exceptionReason?: string,
): UpstreamComponentParityEntry {
	return {
		id,
		category,
		status,
		support,
		notes,
		exceptionReason,
	};
}

const overlapNeedsAudit = [
	"android",
	"animated-beam",
	"animated-shiny-text",
	"bento-grid",
	"border-beam",
	"dock",
	"dot-pattern",
	"grid-pattern",
	"marquee",
	"meteors",
	"number-ticker",
	"orbiting-circles",
	"retro-grid",
	"ripple",
	"safari",
	"shimmer-button",
	"shine-border",
	"sparkles-text",
	"text-reveal",
	"typing-animation",
	"word-rotate",
] as const;

const tailwindOnlyOverlap = [] as const;

const missingByCategory = {
	widget: [
		"animated-list",
		"avatar-circles",
		"code-comparison",
		"confetti",
		"cool-mode",
		"file-tree",
		"globe",
		"hero-video-dialog",
		"icon-cloud",
		"lens",
		"magic-card",
		"pointer",
		"scroll-progress",
		"terminal",
	] as const,
	text: ["animated-theme-toggler", "highlighter", "video-text"] as const,
	background: [
		"animated-grid-pattern",
		"blur-fade",
		"dotted-map",
		"flickering-grid",
		"interactive-grid-pattern",
		"light-rays",
		"neon-gradient-card",
		"particles",
		"pixel-image",
		"progressive-blur",
		"striped-pattern",
		"warp-background",
	] as const,
	interactive: [
		"interactive-hover-button",
		"scroll-based-velocity",
		"shiny-button",
		"smooth-cursor",
	] as const,
	media: [] as const,
} satisfies Record<ParityCategory, readonly string[]>;

const overlapNotes = [
	"Local implementation exists, but public API and runtime behavior still need parity verification against upstream Magic UI.",
] as const;

export const upstreamComponentParityManifest = [
	createEntry(
		"animated-circular-progress-bar",
		"widget",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"animated-gradient-text",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"aurora-text",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"comic-text",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"hyper-text",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"line-shadow-text",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"morphing-text",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"pulsating-button",
		"interactive",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"rainbow-button",
		"interactive",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"ripple-button",
		"interactive",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"spinning-text",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry(
		"text-animate",
		"text",
		"partial",
		createSupport(true, true, true),
		[...overlapNotes],
	),
	createEntry("iphone", "media", "partial", createSupport(true, true, true), [
		...overlapNotes,
		"Fork-only `iphone-15` can now be treated as a legacy extra while new work targets upstream `iphone` parity.",
	]),
	...overlapNeedsAudit.map((id) =>
		createEntry(id, "widget", "partial", createSupport(true, true, true), [
			...overlapNotes,
		]),
	),
	...tailwindOnlyOverlap.map((id) =>
		createEntry(id, "widget", "partial", createSupport(true, false, false), [
			...overlapNotes,
			"Tailwind implementation exists, but Panda, docs, and multi-demo coverage are still missing.",
		]),
	),
	...missingByCategory.widget.map((id) =>
		createEntry(id, "widget", "missing", createSupport(false, false, false)),
	),
	...missingByCategory.text.map((id) =>
		createEntry(id, "text", "missing", createSupport(false, false, false)),
	),
	...missingByCategory.background.map((id) =>
		createEntry(
			id,
			"background",
			"missing",
			createSupport(false, false, false),
		),
	),
	...missingByCategory.interactive.map((id) =>
		createEntry(
			id,
			"interactive",
			"missing",
			createSupport(false, false, false),
		),
	),
	...missingByCategory.media.map((id) =>
		createEntry(id, "media", "missing", createSupport(false, false, false)),
	),
	createEntry(
		"animated-subscribe-button",
		"interactive",
		"exception",
		createSupport(false, false, false),
		[
			"Upstream source exists, but there is no public registry artifact to mirror cleanly.",
			"This should only be revisited if Mystic explicitly adopts undocumented upstream helpers.",
		],
		"Undocumented upstream helper without a public registry entry.",
	),
	createEntry(
		"client-tweet-card",
		"widget",
		"exception",
		createSupport(false, false, false),
		[
			"Upstream depends on react-tweet.",
			"Revisit only if Mystic adopts a Solid-native tweet embed strategy.",
		],
		"Depends on a React-specific tweet embed implementation.",
	),
	createEntry(
		"tweet-card",
		"widget",
		"exception",
		createSupport(false, false, false),
		[
			"Upstream depends on react-tweet.",
			"Revisit only if Mystic adopts a Solid-native tweet embed strategy.",
		],
		"Depends on a React-specific tweet embed implementation.",
	),
] as const satisfies readonly UpstreamComponentParityEntry[];

export const forkOnlyComponents = [
	{
		id: "background-lines",
		frameworks: ["tailwind"],
		docs: false,
		recommendedAction: "keep",
		notes: ["Useful fork-only extra. No direct upstream Magic UI equivalent."],
	},
	{
		id: "blur-in",
		frameworks: ["tailwind"],
		docs: false,
		recommendedAction: "keep",
		notes: [
			"Keep as a fork extra unless it is intentionally merged into future blur-fade parity work.",
		],
	},
	{
		id: "flip-text",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "keep",
	},
	{
		id: "gradual-spacing",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "keep",
	},
	{
		id: "iphone-15",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "map-to-upstream",
		upstreamReplacement: "iphone",
		notes: [
			"Current component should evolve into upstream-compatible `iphone` parity.",
		],
	},
	{
		id: "letter-pullup",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "keep",
	},
	{
		id: "no-signal-screen",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "keep",
	},
	{
		id: "sparkles",
		frameworks: ["tailwind"],
		docs: false,
		recommendedAction: "keep",
	},
	{
		id: "spotlight",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "keep",
	},
	{
		id: "starfield",
		frameworks: ["tailwind"],
		docs: false,
		recommendedAction: "keep",
	},
	{
		id: "word-fade-in",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "keep",
	},
	{
		id: "word-pullup",
		frameworks: ["tailwind", "panda"],
		docs: true,
		recommendedAction: "keep",
	},
] as const satisfies readonly ForkOnlyComponentEntry[];

export const approvedParityExceptions = [
	{
		id: "marketing-site",
		scope: "website",
		reason:
			"Magic UI blog, showcase, paid templates, and marketing systems are outside the component parity target.",
	},
	{
		id: "react-specific-install-affordances",
		scope: "workflow",
		reason:
			"Features like shadcn-native registry ergonomics or Open in v0 should not block Solid parity work.",
	},
	{
		id: "react-tweet-components",
		scope: "component",
		reason:
			"Tweet components are currently excluded until a Solid-native replacement strategy exists.",
	},
] as const satisfies readonly ParityExceptionEntry[];

export const paritySummary = {
	upstreamComponentCount: upstreamComponentParityManifest.length,
	partialCount: upstreamComponentParityManifest.filter(
		(component) => component.status === "partial",
	).length,
	missingCount: upstreamComponentParityManifest.filter(
		(component) => component.status === "missing",
	).length,
	exceptionCount: upstreamComponentParityManifest.filter(
		(component) => component.status === "exception",
	).length,
	tailwindCoverageCount: upstreamComponentParityManifest.filter(
		(component) => component.support.tailwind,
	).length,
	pandaCoverageCount: upstreamComponentParityManifest.filter(
		(component) => component.support.panda,
	).length,
	docsCoverageCount: upstreamComponentParityManifest.filter(
		(component) => component.support.docs,
	).length,
	forkOnlyComponentCount: forkOnlyComponents.length,
} as const;
