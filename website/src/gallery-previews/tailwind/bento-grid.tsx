export default function BentoGridGalleryPreview() {
	return (
		<div class="grid w-full gap-4 md:grid-cols-3">
			<div class="rounded-3xl border border-black/10 bg-slate-950 p-6 text-white shadow-lg md:col-span-2 md:row-span-2">
				<p class="text-sm uppercase tracking-[0.3em] text-white/60">Showcase</p>
				<h2 class="mt-4 text-3xl font-bold md:text-5xl">
					Bento grid layouts for feature storytelling
				</h2>
				<p class="mt-4 max-w-xl text-sm text-slate-200 md:text-lg">
					This gallery preview uses a lightweight static tile arrangement so the
					layout intent is always visible in both the embedded preview and the
					committed screenshot.
				</p>
			</div>
			<div class="rounded-3xl border border-black/10 bg-gradient-to-br from-sky-100 to-cyan-50 p-6 shadow-lg">
				<h3 class="text-lg font-semibold text-slate-900">Reusable tiles</h3>
				<p class="mt-2 text-sm text-slate-600">
					Mix hero cards, statistics, and callouts in one surface.
				</p>
			</div>
			<div class="rounded-3xl border border-black/10 bg-gradient-to-br from-fuchsia-100 to-rose-50 p-6 shadow-lg">
				<h3 class="text-lg font-semibold text-slate-900">Flexible spans</h3>
				<p class="mt-2 text-sm text-slate-600">
					Combine wide and compact panels without losing rhythm.
				</p>
			</div>
			<div class="rounded-3xl border border-black/10 bg-gradient-to-br from-amber-100 to-orange-50 p-6 shadow-lg md:col-span-2">
				<h3 class="text-lg font-semibold text-slate-900">
					Great for galleries
				</h3>
				<p class="mt-2 text-sm text-slate-600">
					The screenshot shows the layout immediately, while the live panel
					keeps the card interactive.
				</p>
			</div>
		</div>
	);
}
