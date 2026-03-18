import { css } from "styled-system/css";
import { Box, Center } from "styled-system/jsx";
import { Ripple } from "../../../../components/panda/src/ui/ripple";
import { galleryRippleLogo } from "../shared/fixtures";

export default function RippleGalleryPreview() {
	return (
		<Box
			position="relative"
			height="32rem"
			width="full"
			overflow="hidden"
			borderRadius="3xl"
			backgroundColor="gray.950"
		>
			<Center height="full">
				<img
					src={galleryRippleLogo}
					alt="Mystic UI"
					class={css({
						height: "24",
						position: "relative",
						width: "24",
						zIndex: "10",
					})}
				/>
			</Center>
			<Ripple />
		</Box>
	);
}
