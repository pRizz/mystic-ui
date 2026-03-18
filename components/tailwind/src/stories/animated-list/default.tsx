import { AnimatedList } from "@/ui/animated-list";

const notifications = [
	"New message from Magic UI",
	"Your component build finished",
	"Parsers updated successfully",
];

export default function AnimatedListDemo() {
	return (
		<div class="flex min-h-64 items-center justify-center">
			<AnimatedList class="w-full max-w-sm">
				{notifications.map((notification) => (
					<div
						key={notification}
						class="rounded-lg border bg-background px-4 py-3 shadow-sm"
					>
						<p class="text-sm font-medium">{notification}</p>
					</div>
				))}
			</AnimatedList>
		</div>
	);
}
