export default function AnimatedBeamGalleryPreview() {
	return (
		<div class="flex min-h-[24rem] w-full items-center justify-center">
			<div class="relative flex w-full max-w-4xl items-center justify-between gap-6 rounded-3xl border border-black/10 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
				<div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-white">
					A
				</div>
				<div class="absolute left-[22%] right-[22%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-sky-400 via-fuchsia-500 to-amber-400" />
				<div class="absolute left-[22%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.8)]" />
				<div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
					B
				</div>
				<div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-xl font-bold text-white">
					C
				</div>
			</div>
		</div>
	);
}
