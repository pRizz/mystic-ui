import { getStory } from "@/lib/storybook";
import { AnimatedThemeToggler } from "@/ui/animated-theme-toggler";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof AnimatedThemeToggler> = {
	title: "Buttons/Animated Theme Toggler",
	component: AnimatedThemeToggler,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("animated-theme-toggler", "default");
