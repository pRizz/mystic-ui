import { css } from "styled-system/css";
import { SimpleGrid } from "styled-system/jsx";
import { BlurFade } from "../../../../components/panda/src/ui/blur-fade";
import { galleryPreviewImages } from "../shared/fixtures";

export default function BlurFadeGalleryPreview() {
	return (
		<SimpleGrid columns={{ base: 1, md: 3 }} gap="4" width="full">
			{galleryPreviewImages.map((src, index) => (
				<BlurFade key={src} delay={index * 0.15}>
					<img
						src={src}
						alt={`Gallery preview ${index + 1}`}
						class={css({
							borderRadius: "2xl",
							boxShadow: "lg",
							height: "48",
							objectFit: "cover",
							width: "full",
						})}
					/>
				</BlurFade>
			))}
		</SimpleGrid>
	);
}
