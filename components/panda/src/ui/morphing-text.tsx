import {
	type Component,
	For,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import { css, cx } from "styled-system/css";

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
			class={cx(
				css({
					position: "relative",
					marginX: "auto",
					height: "16",
					width: "full",
					maxWidth: "3xl",
					textAlign: "center",
					fontFamily: "sans",
					fontSize: "40pt",
					fontWeight: "bold",
					lineHeight: "none",
					filter: "url(#threshold) blur(0.6px)",
					md: {
						height: "24",
					},
					lg: {
						fontSize: "6rem",
					},
				}),
				props.class,
			)}
		>
			<span
				class={css({
					position: "absolute",
					insetInline: "0",
					top: "0",
					marginX: "auto",
					display: "inline-block",
					width: "full",
				})}
				ref={currentTextRef}
			/>
			<span
				class={css({
					position: "absolute",
					insetInline: "0",
					top: "0",
					marginX: "auto",
					display: "inline-block",
					width: "full",
				})}
				ref={nextTextRef}
			/>
			<svg
				id="filters"
				class={css({
					position: "fixed",
					width: "0",
					height: "0",
				})}
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
			<span
				class={css({
					position: "absolute",
					width: "1px",
					height: "1px",
					padding: "0",
					margin: "-1px",
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					borderWidth: "0",
				})}
			>
				<For each={props.texts}>{(text) => text}</For>
			</span>
		</div>
	);
};
