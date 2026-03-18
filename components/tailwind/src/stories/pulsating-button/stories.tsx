import { getStory } from "@/lib/storybook";
import { PulsatingButton } from "@/ui/pulsating-button";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof PulsatingButton> = {
	title: "Buttons/Pulsating Button",
	component: PulsatingButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("pulsating-button", "default");
