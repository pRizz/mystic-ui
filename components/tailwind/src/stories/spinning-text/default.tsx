import { SpinningText } from "@/ui/spinning-text";

export default function SpinningTextDemo() {
	return (
		<div class="flex min-h-64 items-center justify-center">
			<SpinningText class="text-xs uppercase tracking-[0.2em]">
				learn more • earn more • grow more •
			</SpinningText>
		</div>
	);
}
