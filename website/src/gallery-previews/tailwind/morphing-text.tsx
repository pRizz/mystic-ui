export default function MorphingTextGalleryPreview() {
	return (
		<div class="flex min-h-[24rem] w-full items-center justify-center">
			<div class="relative text-center">
				<div class="absolute inset-0 blur-3xl">
					<div class="mx-auto h-24 w-64 rounded-full bg-fuchsia-300/50" />
				</div>
				<div class="relative space-y-3">
					<p class="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">
						Gallery
					</p>
					<h2 class="text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-7xl">
						Morphing Text
					</h2>
					<p class="text-sm text-slate-600 dark:text-slate-200 md:text-lg">
						A static fallback keeps this preview reliable in both the embedded
						iframe and the committed screenshot.
					</p>
				</div>
			</div>
		</div>
	);
}
