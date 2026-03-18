import { BlurIn } from "../../../../components/tailwind/src/ui/blur-in";

export default function BlurInGalleryPreview() {
	return (
		<div class="flex min-h-[22rem] w-full flex-col items-center justify-center gap-4 rounded-3xl border border-black/10 bg-white/80 px-6 text-center shadow-lg backdrop-blur dark:border-white/10 dark:bg-black/60">
			<BlurIn duration={1.1}>
				<h2 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
					Blur In
				</h2>
			</BlurIn>
			<BlurIn duration={1.3}>
				<p class="max-w-xl text-sm text-slate-600 dark:text-slate-300 md:text-lg">
					A lightweight single-shot entrance animation for headings, badges, and
					hero copy.
				</p>
			</BlurIn>
		</div>
	);
}
