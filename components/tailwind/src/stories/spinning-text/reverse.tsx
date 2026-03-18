import { SpinningText } from "@/ui/spinning-text";

export default function SpinningTextReverseDemo() {
	return (
		<div class="flex min-h-64 items-center justify-center">
			<SpinningText
				reverse
				class="text-xs uppercase tracking-[0.2em]"
				radius={6}
			>
				learn more • earn more • grow more •
			</SpinningText>
		</div>
	);
}
