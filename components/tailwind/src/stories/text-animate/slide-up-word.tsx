import { TextAnimate } from "@/ui/text-animate";

export default function TextAnimateSlideUpWordDemo() {
	return (
		<div class="flex min-h-64 items-center justify-center">
			<TextAnimate animation="slideUp" by="word">
				Slide up by word
			</TextAnimate>
		</div>
	);
}
