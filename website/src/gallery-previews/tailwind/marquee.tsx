import { Marquee } from "../../../../components/tailwind/src/ui/marquee";
import { galleryReviewCards } from "../shared/fixtures";

const ReviewCard = (props: (typeof galleryReviewCards)[number]) => {
	return (
		<figure class="relative w-72 overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/10">
			<div class="flex items-center gap-3">
				<img
					class="h-10 w-10 rounded-full"
					width="40"
					height="40"
					alt={`${props.name} avatar`}
					src={props.img}
				/>
				<div class="flex flex-col">
					<span class="text-sm font-semibold text-slate-900 dark:text-white">
						{props.name}
					</span>
					<p class="text-xs text-slate-500 dark:text-slate-300">
						{props.username}
					</p>
				</div>
			</div>
			<blockquote class="mt-3 text-sm text-slate-700 dark:text-slate-200">
				{props.body}
			</blockquote>
		</figure>
	);
};

export default function MarqueeGalleryPreview() {
	return (
		<div class="relative w-full overflow-hidden py-6">
			<Marquee pauseOnHover duration={24}>
				{galleryReviewCards.map((review) => (
					<ReviewCard key={`${review.name}-top`} {...review} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover duration={28}>
				{galleryReviewCards.map((review) => (
					<ReviewCard key={`${review.name}-bottom`} {...review} />
				))}
			</Marquee>
			<div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
			<div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />
		</div>
	);
}
