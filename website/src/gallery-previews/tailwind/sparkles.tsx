export default function SparklesGalleryPreview() {
	return (
		<div class="relative flex h-[32rem] w-full items-center justify-center overflow-hidden rounded-3xl bg-slate-950">
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.22),_transparent_34%),radial-gradient(circle_at_20%_80%,_rgba(192,132,252,0.2),_transparent_28%),radial-gradient(circle_at_80%_70%,_rgba(250,204,21,0.18),_transparent_24%)]" />
			<div class="relative z-10 text-center">
				<p class="text-sm uppercase tracking-[0.4em] text-white/60">
					Mystic UI
				</p>
				<h2 class="mt-3 text-4xl font-bold text-white md:text-6xl">Sparkles</h2>
				<p class="mt-4 max-w-lg text-sm text-slate-200 md:text-lg">
					A lightweight static preview stands in for the particle field inside
					the demo gallery.
				</p>
			</div>
		</div>
	);
}
