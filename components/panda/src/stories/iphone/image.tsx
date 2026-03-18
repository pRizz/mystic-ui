import { css } from "styled-system/css";

import { Iphone } from "@/ui/iphone";

const previewImage =
	"https://placehold.co/390x844/png?text=Mystic+UI&font=montserrat";

export default function IphoneImageDemo() {
	return (
		<div class={css({ position: "relative", width: "16rem" })}>
			<Iphone src={previewImage} />
		</div>
	);
}
