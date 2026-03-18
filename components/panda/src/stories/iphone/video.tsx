import { css } from "styled-system/css";

import { Iphone } from "@/ui/iphone";

const previewVideo =
	"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function IphoneVideoDemo() {
	return (
		<div class={css({ position: "relative", width: "16rem" })}>
			<Iphone videoSrc={previewVideo} />
		</div>
	);
}
