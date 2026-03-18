import { getStory } from "@/lib/storybook";
import { Highlighter } from "@/ui/highlighter";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof Highlighter> = {
	title: "Text/Highlighter",
	component: Highlighter,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("highlighter", "default");
