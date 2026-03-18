import { getStory } from "@/lib/storybook";
import { HyperText } from "@/ui/hyper-text";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof HyperText> = {
	title: "Text/Hyper Text",
	component: HyperText,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("hyper-text", "default");
