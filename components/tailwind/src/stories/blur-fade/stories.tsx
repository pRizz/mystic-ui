import { getStory } from "@/lib/storybook";
import { BlurFade } from "@/ui/blur-fade";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof BlurFade> = {
	title: "Effects/Blur Fade",
	component: BlurFade,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("blur-fade", "default");
export const Text: Story = getStory("blur-fade", "text");
