import { getStory } from "@/lib/storybook";
import { AnimatedList } from "@/ui/animated-list";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof AnimatedList> = {
	title: "Component/Animated List",
	component: AnimatedList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("animated-list", "default");
