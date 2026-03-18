import { getStory } from "@/lib/storybook";
import { AuroraText } from "@/ui/aurora-text";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof AuroraText> = {
	title: "Text/Aurora Text",
	component: AuroraText,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("aurora-text", "default");
