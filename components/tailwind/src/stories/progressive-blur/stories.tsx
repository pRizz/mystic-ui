import { getStory } from "@/lib/storybook";
import { ProgressiveBlur } from "@/ui/progressive-blur";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof ProgressiveBlur> = {
	title: "Backgrounds/Progressive Blur",
	component: ProgressiveBlur,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("progressive-blur", "default");
