import { getStory } from "@/lib/storybook";
import { LightRays } from "@/ui/light-rays";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof LightRays> = {
	title: "Backgrounds/Light Rays",
	component: LightRays,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("light-rays", "default");
