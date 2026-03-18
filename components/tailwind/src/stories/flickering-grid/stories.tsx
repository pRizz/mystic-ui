import { getStory } from "@/lib/storybook";
import { FlickeringGrid } from "@/ui/flickering-grid";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof FlickeringGrid> = {
	title: "Backgrounds/Flickering Grid",
	component: FlickeringGrid,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("flickering-grid", "default");
export const Rounded: Story = getStory("flickering-grid", "rounded");
