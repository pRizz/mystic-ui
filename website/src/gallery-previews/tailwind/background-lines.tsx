import { BackgroundLines } from "../../../../components/tailwind/src/ui/background-lines";

export default function BackgroundLinesGalleryPreview() {
	return (
		<BackgroundLines class="flex min-h-[32rem] w-full flex-col items-center justify-center px-4">
			<h2 class="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans text-3xl font-bold tracking-tight text-transparent dark:from-neutral-300 dark:to-white md:text-5xl lg:text-7xl">
				Component gallery
				<br />
				preview mode
			</h2>
			<p class="mx-auto max-w-2xl text-center text-sm text-neutral-700 dark:text-neutral-300 md:text-lg">
				Background Lines remains a tailwind-only extra, but it still appears in
				the shared gallery alongside the rest of the library.
			</p>
		</BackgroundLines>
	);
}
