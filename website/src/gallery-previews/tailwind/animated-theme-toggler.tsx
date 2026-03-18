export default function AnimatedThemeTogglerGalleryPreview() {
	return (
		<div class="flex min-h-[22rem] w-full items-center justify-center">
			<div class="inline-flex items-center gap-4 rounded-full border border-black/10 bg-white px-5 py-3 shadow-lg dark:border-white/10 dark:bg-slate-900">
				<div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
					Dark
				</div>
				<div class="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold text-slate-900 dark:border-white/10 dark:bg-slate-800 dark:text-white">
					Light
				</div>
			</div>
		</div>
	);
}
