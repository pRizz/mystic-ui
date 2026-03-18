import { getStory } from "@/lib/storybook";
import { Iphone } from "@/ui/iphone";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof Iphone> = {
	title: "Device Mockups/Iphone",
	component: Iphone,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("iphone", "default");
export const Image: Story = getStory("iphone", "image");
export const Video: Story = getStory("iphone", "video");
