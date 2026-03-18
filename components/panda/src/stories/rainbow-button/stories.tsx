import { getStory } from "@/lib/storybook";
import { RainbowButton } from "@/ui/rainbow-button";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof RainbowButton> = {
	title: "Buttons/Rainbow Button",
	component: RainbowButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("rainbow-button", "default");
export const Outline: Story = getStory("rainbow-button", "outline");
