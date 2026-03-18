import type { Component } from "solid-js";
import { StoryPreview } from "~/components/docs/story-preview";
import { useDocsPage } from "~/lib/docs-page";

interface DocStoryProps {
	name: string;
	component?: string;
}

export const DocStory: Component<DocStoryProps> = (props) => {
	const docsPage = useDocsPage();

	return (
		<StoryPreview
			framework={docsPage.framework()}
			component={props.component ?? docsPage.componentId()}
			name={props.name}
		/>
	);
};
