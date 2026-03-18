import { getStory } from "@/lib/storybook";
import { AnimatedGridPattern } from "@/ui/animated-grid-pattern";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof AnimatedGridPattern> = {
	title: "Backgrounds/Animated Grid Pattern",
	component: AnimatedGridPattern,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("animated-grid-pattern", "default");
