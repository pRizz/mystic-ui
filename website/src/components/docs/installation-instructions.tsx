import type { RegistryEntry } from "@mystic-ui/registry/src/schema";
import { useParams } from "@solidjs/router";
import { type Component, For, Show, createMemo } from "solid-js";
import { CodeBlock } from "~/components/code-block";
import { Link } from "~/components/ui/link";
import { Step, Steps } from "~/components/ui/stepper";
import { Tabs } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { getLocalRegistryEntry } from "~/lib/registry";

const instructions: {
	title: string;
	condition: (entry: RegistryEntry) => boolean;
	component: Component<{ entry: RegistryEntry }>;
}[] = [
	{
		title: "Install dependencies",
		condition: (entry) => !!entry.dependencies,
		component: (props) => (
			<CodeBlock
				code={`npm i ${props.entry.dependencies?.join(" ")}`}
				lang="shell"
			/>
		),
	},
	{
		title: "Modify/extend config",
		condition: (entry) => !!entry.config,
		component: (props) => (
			<CodeBlock
				code={`export default ${JSON.stringify(props.entry.config, null, 2)}`}
				lang="ts"
			/>
		),
	},
	{
		title: "Copy and paste the component.",
		condition: () => true,
		component: (props) => <CodeBlock code={props.entry.content} lang="tsx" />,
	},
];

function getExportedComponentNames(content: string) {
	const exportedNames = Array.from(
		content.matchAll(
			/export\s+(?:const|function|class)\s+([A-Z][A-Za-z0-9_]*)/g,
		),
		(match) => match[1],
	);

	return [...new Set(exportedNames)];
}

export const InstallationInstructions: Component = () => {
	const params = useParams() satisfies {
		framework: "tailwind" | "panda";
		id: string;
	};

	const entry = createMemo<RegistryEntry>(() => {
		return (
			getLocalRegistryEntry(params.framework, params.id) ?? {
				id: "not-found",
				content: "Component not found",
			}
		);
	});
	const packageImportCode = createMemo(() => {
		const exportNames = getExportedComponentNames(entry().content);
		const namedImport =
			exportNames.length > 0
				? exportNames.join(", ")
				: "/* component export */";
		return `import { ${namedImport} } from "mystic-ui";`;
	});

	return (
		<Tabs.Root
			defaultValue={params.framework === "tailwind" ? "package" : "cli"}
		>
			<Tabs.List>
				<Show when={params.framework === "tailwind"}>
					<Tabs.Trigger value="package">Package</Tabs.Trigger>
				</Show>
				<Tabs.Trigger value="cli">CLI</Tabs.Trigger>
				<Tabs.Trigger value="manual">Manual</Tabs.Trigger>
				<Tabs.Indicator />
			</Tabs.List>
			<Show when={params.framework === "tailwind"}>
				<Tabs.Content value="package">
					<div style={{ display: "grid", gap: "1rem" }}>
						<CodeBlock code="npm install github:pRizz/mystic-ui" lang="shell" />
						<CodeBlock code={packageImportCode()} lang="tsx" />
						<Text textStyle="sm" color="fg.muted">
							`mystic-ui/tailwind` re-exports the same Tailwind components.
						</Text>
						<Text textStyle="sm" color="fg.muted">
							Finish the one-time Tailwind wiring in{" "}
							<Link href="/docs/tailwind/setup">/docs/tailwind/setup</Link>.
						</Text>
					</div>
				</Tabs.Content>
			</Show>
			<Tabs.Content value="cli">
				<CodeBlock code={`npx @mystic-ui/cli add ${params.id}`} lang="shell" />
			</Tabs.Content>
			<Tabs.Content value="manual">
				<Steps>
					<Show when={entry()}>
						<For
							each={instructions.filter(({ condition }) => condition(entry()))}
						>
							{(instruction, i) => (
								<Step number={i() + 1} title={instruction.title}>
									<instruction.component entry={entry()} />
								</Step>
							)}
						</For>
					</Show>
				</Steps>
			</Tabs.Content>
		</Tabs.Root>
	);
};
