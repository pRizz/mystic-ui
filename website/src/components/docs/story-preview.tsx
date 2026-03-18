import { createAsync } from "@solidjs/router";
import { TbOutlineReload } from "solid-icons/tb";
import { type Component, Show, Suspense, createSignal, lazy } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Center } from "styled-system/jsx";
import { type ComponentFramework, getStoryComponent } from "~/lib/docs";
import { getStorySource } from "~/lib/stories";
import { RawCodeBlock } from "../code-block";
import { IconButton } from "../ui/icon-button";
import { Spinner } from "../ui/spinner";
import { Tabs } from "../ui/tabs";

interface StoryPreviewProps {
	framework: ComponentFramework;
	component: string;
	name: string;
}

export const StoryPreview: Component<StoryPreviewProps> = (props) => {
	const highlightedStorySource = createAsync(
		() => getStorySource(props.framework, props.component, props.name),
		{
			name: "story-source",
			initialValue: {
				source: "",
				html: "",
			},
		},
	);
	const StoryComponent = () => {
		const loadStory = getStoryComponent(
			props.framework,
			props.component,
			props.name,
		);
		if (!loadStory) {
			throw new Error(
				`Story ${props.component}/${props.name} not found for ${props.framework}.`,
			);
		}

		return lazy(loadStory);
	};
	const [reload, setReload] = createSignal(1);

	return (
		<Tabs.Root defaultValue="preview">
			<Tabs.List>
				<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
				<Tabs.Trigger value="code">Code</Tabs.Trigger>
				<Tabs.Indicator />
			</Tabs.List>

			<Tabs.Content value="preview">
				<Center
					position="relative"
					borderWidth="1px"
					p="10"
					borderColor="border.accent"
				>
					<Suspense fallback={<Spinner size="lg" my="6" />}>
						<Show when={reload()} keyed>
							<Dynamic component={StoryComponent()} />
						</Show>
					</Suspense>
					<IconButton
						variant="outline"
						position="absolute"
						size="xs"
						top="1"
						right="1"
						onClick={() => setReload((r) => r + 1)}
					>
						<TbOutlineReload />
					</IconButton>
				</Center>
			</Tabs.Content>
			<Tabs.Content value="code">
				<RawCodeBlock
					html={highlightedStorySource().html}
					code={highlightedStorySource().source}
				/>
			</Tabs.Content>
		</Tabs.Root>
	);
};
