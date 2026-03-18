import { BlurFade } from "../../../../components/tailwind/src/ui/blur-fade";
import { galleryPreviewImages } from "../shared/fixtures";

export default function BlurFadeGalleryPreview() {
	return (
		<div class="grid w-full gap-4 md:grid-cols-3">
			{galleryPreviewImages.map((src, index) => (
				<BlurFade key={src} delay={index * 0.15}>
					<img
						src={src}
						alt={`Gallery preview ${index + 1}`}
						class="h-48 w-full rounded-2xl object-cover shadow-lg"
					/>
				</BlurFade>
			))}
		</div>
	);
}
