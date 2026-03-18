import { getStory } from "@/lib/storybook";
import { LineShadowText } from "@/ui/line-shadow-text";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof LineShadowText> = {
	title: "Text/Line Shadow Text",
	component: LineShadowText,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("line-shadow-text", "default");
