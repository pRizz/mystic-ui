import { getStory } from "@/lib/storybook";
import { ComicText } from "@/ui/comic-text";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof ComicText> = {
	title: "Text/Comic Text",
	component: ComicText,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("comic-text", "default");
