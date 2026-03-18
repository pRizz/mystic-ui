import { AnimatedShinyText } from "../../../../components/tailwind/src/ui/animated-shiny-text";

export default function AnimatedShinyTextGalleryPreview() {
	return (
		<div class="flex min-h-[22rem] w-full items-center justify-center text-center">
			<AnimatedShinyText class="text-4xl font-semibold text-slate-900 dark:text-white md:text-6xl">
				Shiny text preview
			</AnimatedShinyText>
		</div>
	);
}
