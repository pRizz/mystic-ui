import { getStory } from "@/lib/storybook";
import { MorphingText } from "@/ui/morphing-text";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof MorphingText> = {
	title: "Text/Morphing Text",
	component: MorphingText,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("morphing-text", "default");
