import { css } from "styled-system/css";
import { BlurFade } from "../../../../components/panda/src/ui/blur-fade";
import { galleryPreviewImages } from "../shared/fixtures";

export default function BlurFadeGalleryPreview() {
	return (
		<div
			class={css({
				display: "grid",
				gap: "4",
				gridTemplateColumns: {
					base: "1fr",
					md: "repeat(3, minmax(0, 1fr))",
				},
				width: "full",
			})}
		>
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
		</div>
	);
}
