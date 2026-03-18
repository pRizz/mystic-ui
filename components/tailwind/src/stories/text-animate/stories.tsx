import { getStory } from "@/lib/storybook";
import { TextAnimate } from "@/ui/text-animate";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof TextAnimate> = {
	title: "Text/Text Animate",
	component: TextAnimate,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("text-animate", "default");
export const SlideUpWord: Story = getStory("text-animate", "slide-up-word");
