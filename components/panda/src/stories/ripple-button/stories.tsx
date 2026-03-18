import { getStory } from "@/lib/storybook";
import { RippleButton } from "@/ui/ripple-button";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof RippleButton> = {
	title: "Buttons/Ripple Button",
	component: RippleButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("ripple-button", "default");
