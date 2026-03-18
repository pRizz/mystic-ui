import type { RouteSectionProps } from "@solidjs/router";
import { GalleryPreviewPage } from "~/components/gallery/gallery-preview-page";

export default function PandaGalleryPreviewRoute(props: RouteSectionProps) {
	const componentId = () => {
		const maybeComponentId = props.params.id;
		if (!maybeComponentId) {
			throw new Error("Component id is required");
		}

		return maybeComponentId;
	};

	return <GalleryPreviewPage framework="panda" componentId={componentId()} />;
}
