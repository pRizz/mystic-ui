import { type Component, createMemo } from "solid-js";
import { RawCodeBlock } from "~/components/code-block";
import { useDocsPage } from "~/lib/docs-page";

interface ComponentUsageProps {
	body: string;
	imports: string[];
}

export const ComponentUsage: Component<ComponentUsageProps> = (props) => {
	const docsPage = useDocsPage();
	const importSource = createMemo(() =>
		docsPage.framework() === "tailwind"
			? "mystic-ui"
			: `@/components/mystic-ui/${docsPage.componentId()}`,
	);
	const importNames = createMemo(() => props.imports.join(", "));
	const code = createMemo(
		() =>
			`import { ${importNames()} } from "${importSource()}";\n\n${props.body.trim()}`,
	);

	return <RawCodeBlock code={code()} lang="tsx" />;
};
