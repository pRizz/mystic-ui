import { getStory } from "@/lib/storybook";
import { SpinningText } from "@/ui/spinning-text";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof SpinningText> = {
	title: "Text/Spinning Text",
	component: SpinningText,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("spinning-text", "default");
export const Reverse: Story = getStory("spinning-text", "reverse");
