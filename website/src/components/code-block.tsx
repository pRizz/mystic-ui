import { useClipboard } from "@ark-ui/solid";
import type { BundledLanguage } from "shiki";
import { TbOutlineCheck, TbOutlineCopy } from "solid-icons/tb";
import { type Component, createMemo } from "solid-js";
import { css, cx } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { renderCodeHtml } from "~/lib/code-html";
import { Clipboard } from "./ui/clipboard";
import { IconButton } from "./ui/icon-button";

interface CodeBlockProps {
	code: string;
	lang?: BundledLanguage;
	class?: string;
}

export const RawCodeBlock: Component<CodeBlockProps & { html?: string }> = (
	props,
) => {
	const clipboard = useClipboard({ value: props.code });
	const html = createMemo(
		() => props.html ?? renderCodeHtml(props.code, props.lang),
	);

	return (
		<Clipboard.RootProvider
			value={clipboard}
			position="relative"
			class={cx("dark", props.class)}
		>
			<Box
				textStyle="sm"
				class={css({
					"&>pre": {
						padding: 4,
						borderWidth: "1px",
						borderColor: "border.accent",
						borderRadius: "l3",
						tabSize: 2,
						overflowX: "auto",
						maxHeight: "md",
						overflowY: "auto",
					},
				})}
				innerHTML={html()}
			/>
			<Clipboard.Control position="absolute" right="2" top="2">
				<Clipboard.Trigger
					asChild={(parentProps) => (
						<IconButton size="sm" variant="ghost" {...parentProps()}>
							<Clipboard.Indicator copied={<TbOutlineCheck />}>
								<TbOutlineCopy />
							</Clipboard.Indicator>
						</IconButton>
					)}
				/>
			</Clipboard.Control>
		</Clipboard.RootProvider>
	);
};

export const CodeBlock: Component<CodeBlockProps> = (props) => {
	return <RawCodeBlock {...props} />;
};
