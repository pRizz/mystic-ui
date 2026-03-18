import { TextAnimate } from "@/ui/text-animate";

export default function TextAnimateDemo() {
	return (
		<div class="flex min-h-64 items-center justify-center">
			<TextAnimate animation="blurInUp" by="character" once>
				Blur in by character
			</TextAnimate>
		</div>
	);
}
