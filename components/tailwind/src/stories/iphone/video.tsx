import { Iphone } from "@/ui/iphone";

const previewVideo =
	"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function IphoneVideoDemo() {
	return (
		<div class="relative w-64">
			<Iphone videoSrc={previewVideo} />
		</div>
	);
}
