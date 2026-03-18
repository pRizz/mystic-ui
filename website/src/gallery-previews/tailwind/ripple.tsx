import { Ripple } from "../../../../components/tailwind/src/ui/ripple";
import { galleryRippleLogo } from "../shared/fixtures";

export default function RippleGalleryPreview() {
	return (
		<div class="relative flex h-[32rem] w-full items-center justify-center overflow-hidden rounded-3xl bg-slate-950">
			<img src={galleryRippleLogo} class="z-10 h-24 w-24" alt="Mystic UI" />
			<Ripple />
		</div>
	);
}
