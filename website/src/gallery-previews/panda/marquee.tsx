import { css, cx } from "styled-system/css";
import { Box, Stack } from "styled-system/jsx";
import { Marquee } from "../../../../components/panda/src/ui/marquee";
import { galleryReviewCards } from "../shared/fixtures";

const reviewCardClass = css({
	backdropFilter: "blur(20px)",
	backgroundColor: "whiteAlpha.800",
	borderRadius: "2xl",
	borderWidth: "1px",
	borderColor: "blackAlpha.100",
	boxShadow: "lg",
	overflow: "hidden",
	p: "4",
	width: "72",
	_dark: {
		backgroundColor: "whiteAlpha.100",
		borderColor: "whiteAlpha.100",
	},
});

export default function MarqueeGalleryPreview() {
	return (
		<Box position="relative" width="full" overflow="hidden" py="6">
			<Marquee pauseOnHover duration={24}>
				{galleryReviewCards.map((review) => (
					<figure class={reviewCardClass} key={`${review.name}-top`}>
						<Stack gap="3">
							<Box display="flex" alignItems="center" gap="3">
								<img
									src={review.img}
									alt={`${review.name} avatar`}
									class={css({
										borderRadius: "full",
										height: "10",
										width: "10",
									})}
								/>
								<Stack gap="0">
									<span
										class={css({
											color: "fg.default",
											fontSize: "sm",
											fontWeight: "semibold",
										})}
									>
										{review.name}
									</span>
									<span class={css({ color: "fg.muted", fontSize: "xs" })}>
										{review.username}
									</span>
								</Stack>
							</Box>
							<blockquote class={css({ color: "fg.default", fontSize: "sm" })}>
								{review.body}
							</blockquote>
						</Stack>
					</figure>
				))}
			</Marquee>
			<Marquee reverse pauseOnHover duration={28}>
				{galleryReviewCards.map((review) => (
					<figure class={reviewCardClass} key={`${review.name}-bottom`}>
						<Stack gap="3">
							<Box display="flex" alignItems="center" gap="3">
								<img
									src={review.img}
									alt={`${review.name} avatar`}
									class={css({
										borderRadius: "full",
										height: "10",
										width: "10",
									})}
								/>
								<Stack gap="0">
									<span
										class={css({
											color: "fg.default",
											fontSize: "sm",
											fontWeight: "semibold",
										})}
									>
										{review.name}
									</span>
									<span class={css({ color: "fg.muted", fontSize: "xs" })}>
										{review.username}
									</span>
								</Stack>
							</Box>
							<blockquote class={css({ color: "fg.default", fontSize: "sm" })}>
								{review.body}
							</blockquote>
						</Stack>
					</figure>
				))}
			</Marquee>
			<div
				class={cx(
					css({
						background:
							"linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, transparent 100%)",
						insetY: "0",
						left: "0",
						pointerEvents: "none",
						position: "absolute",
						width: "24",
						_dark: {
							background:
								"linear-gradient(90deg, rgba(2, 6, 23, 1) 0%, transparent 100%)",
						},
					}),
				)}
			/>
			<div
				class={css({
					background:
						"linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, transparent 100%)",
					insetY: "0",
					pointerEvents: "none",
					position: "absolute",
					right: "0",
					width: "24",
					_dark: {
						background:
							"linear-gradient(270deg, rgba(2, 6, 23, 1) 0%, transparent 100%)",
					},
				})}
			/>
		</Box>
	);
}
