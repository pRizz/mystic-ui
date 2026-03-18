import { getStory } from "@/lib/storybook";
import { StripedPattern } from "@/ui/striped-pattern";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof StripedPattern> = {
	title: "Backgrounds/Striped Pattern",
	component: StripedPattern,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("striped-pattern", "default");
export const Dashed: Story = getStory("striped-pattern", "dashed");
export const Right: Story = getStory("striped-pattern", "right");
