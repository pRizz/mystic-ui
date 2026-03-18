import { OrbitingCircles } from "../../../../components/tailwind/src/ui/orbiting-circles";

const orbitBadgeClass =
	"flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold shadow-md dark:border-white/10 dark:bg-slate-900";

export default function OrbitingCirclesGalleryPreview() {
	return (
		<div class="relative flex h-[30rem] w-full items-center justify-center overflow-hidden">
			<div class="text-center">
				<p class="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
					Mystic UI
				</p>
				<h2 class="mt-3 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
					Orbiting Circles
				</h2>
			</div>
			<OrbitingCircles radius={96}>
				<div class={orbitBadgeClass}>UI</div>
			</OrbitingCircles>
			<OrbitingCircles radius={96} delay={8}>
				<div class={orbitBadgeClass}>JS</div>
			</OrbitingCircles>
			<OrbitingCircles reverse radius={176}>
				<div class={orbitBadgeClass}>TS</div>
			</OrbitingCircles>
			<OrbitingCircles reverse radius={176} delay={8}>
				<div class={orbitBadgeClass}>DX</div>
			</OrbitingCircles>
		</div>
	);
}
