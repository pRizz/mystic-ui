import { getStory } from "@/lib/storybook";
import { AnimatedCircularProgressBar } from "@/ui/animated-circular-progress-bar";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof AnimatedCircularProgressBar> = {
	title: "Text/Animated Circular Progress Bar",
	component: AnimatedCircularProgressBar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory(
	"animated-circular-progress-bar",
	"default",
);
