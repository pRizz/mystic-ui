import { getStory } from "@/lib/storybook";
import { NumberTicker } from "@/ui/number-ticker";
import type { Meta, StoryObj } from "storybook-solidjs";

const meta: Meta<typeof NumberTicker> = {
	title: "Text/Number Ticker",
	component: NumberTicker,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = getStory("number-ticker", "default");
export const Decimal: Story = getStory("number-ticker", "decimal");
export const StartValue: Story = getStory("number-ticker", "start-value");
