import { cn } from "@/lib/utils";
import {
	type Component,
	For,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";

const morphTime = 1.5;
const cooldownTime = 0.5;

export interface MorphingTextProps {
	texts: string[];
	class?: string;
}

export const MorphingText: Component<MorphingTextProps> = (props) => {
	const [textIndex, setTextIndex] = createSignal(0);
	let morph = 0;
	let cooldown = cooldownTime;
	let time = new Date();
	let animationFrame = 0;
	let currentTextRef: HTMLSpanElement | undefined;
	let nextTextRef: HTMLSpanElement | undefined;

	const setStyles = (fraction: number) => {
		if (!currentTextRef || !nextTextRef) {
			return;
		}

		nextTextRef.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		nextTextRef.style.opacity = `${fraction ** 0.4 * 100}%`;

		const invertedFraction = 1 - fraction;
		currentTextRef.style.filter = `blur(${Math.min(
			8 / invertedFraction - 8,
			100,
		)}px)`;
		currentTextRef.style.opacity = `${invertedFraction ** 0.4 * 100}%`;
		currentTextRef.textContent =
			props.texts[textIndex() % props.texts.length] ?? "";
		nextTextRef.textContent =
			props.texts[(textIndex() + 1) % props.texts.length] ?? "";
	};

	const doMorph = () => {
		morph -= cooldown;
		cooldown = 0;

		let fraction = morph / morphTime;
		if (fraction > 1) {
			cooldown = cooldownTime;
			fraction = 1;
		}

		setStyles(fraction);
		if (fraction === 1) {
			setTextIndex((currentIndex) => currentIndex + 1);
		}
	};

	const doCooldown = () => {
		morph = 0;

		if (!currentTextRef || !nextTextRef) {
			return;
		}

		nextTextRef.style.filter = "none";
		nextTextRef.style.opacity = "100%";
		currentTextRef.style.filter = "none";
		currentTextRef.style.opacity = "0%";
	};

	onMount(() => {
		const animate = () => {
			animationFrame = window.requestAnimationFrame(animate);

			const newTime = new Date();
			const delta = (newTime.getTime() - time.getTime()) / 1000;
			time = newTime;

			cooldown -= delta;
			if (cooldown <= 0) {
				doMorph();
				return;
			}

			doCooldown();
		};

		animate();
	});

	onCleanup(() => {
		window.cancelAnimationFrame(animationFrame);
	});

	return (
		<div
			class={cn(
				"relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] font-bold leading-none filter-[url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
				props.class,
			)}
		>
			<span
				class="absolute inset-x-0 top-0 m-auto inline-block w-full"
				ref={currentTextRef}
			/>
			<span
				class="absolute inset-x-0 top-0 m-auto inline-block w-full"
				ref={nextTextRef}
			/>
			<svg
				id="filters"
				class="fixed h-0 w-0"
				preserveAspectRatio="xMidYMid slice"
				aria-hidden="true"
			>
				<defs>
					<filter id="threshold">
						<feColorMatrix
							in="SourceGraphic"
							type="matrix"
							values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140"
						/>
					</filter>
				</defs>
			</svg>
			<span class="sr-only">
				<For each={props.texts}>{(text) => text}</For>
			</span>
		</div>
	);
};
