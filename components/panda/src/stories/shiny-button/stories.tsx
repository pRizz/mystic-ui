import { getStory } from "@/lib/storybook";
import { ShinyButton } from "@/ui/shiny-button";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof ShinyButton> = {
	title: "Buttons/Shiny Button",
	component: ShinyButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("shiny-button", "default");
