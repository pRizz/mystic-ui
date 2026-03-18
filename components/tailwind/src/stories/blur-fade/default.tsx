import { BlurFade } from "@/ui/blur-fade";

const images = [
	"https://picsum.photos/300/200?random=1",
	"https://picsum.photos/300/200?random=2",
	"https://picsum.photos/300/200?random=3",
];

export default function BlurFadeDemo() {
	return (
		<div class="grid gap-4 md:grid-cols-3">
			{images.map((src, index) => (
				<BlurFade key={src} delay={index * 0.15}>
					<img
						src={src}
						alt={`Sample ${index + 1}`}
						class="h-48 w-full rounded-lg object-cover"
					/>
				</BlurFade>
			))}
		</div>
	);
}
