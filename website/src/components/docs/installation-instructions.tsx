import type { RegistryEntry } from "@mystic-ui/registry/src/schema";
import { useParams } from "@solidjs/router";
import { type Component, For, Show, createMemo } from "solid-js";
import { CodeBlock } from "~/components/code-block";
import { Step, Steps } from "~/components/ui/stepper";
import { Tabs } from "~/components/ui/tabs";
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

	return (
		<Tabs.Root defaultValue="cli">
			<Tabs.List>
				<Tabs.Trigger value="cli">CLI</Tabs.Trigger>
				<Tabs.Trigger value="manual">Manual</Tabs.Trigger>
				<Tabs.Indicator />
			</Tabs.List>
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
