export * from "../../../node_modules/solid-icons/tb/index.js";

import {
	TbFillStar,
	TbOutlineArrowRight,
	TbOutlineCheck,
	TbOutlineChevronRight,
	TbOutlineChevronDown,
	TbOutlineCopy,
	TbOutlineMoon,
	TbOutlineReload,
	TbOutlineSquare,
	TbOutlineSun,
} from "../../../node_modules/solid-icons/tb/index.js";

type IconProps = Parameters<typeof TbOutlineSquare>[0];

const fallbackBrandIcon = (props: IconProps) => TbOutlineSquare(props);

export const TbBrandAbstract = fallbackBrandIcon;
export const TbBrand4chan = fallbackBrandIcon;
export const TbBrandAdobe = fallbackBrandIcon;
export const TbBrandAmongUs = fallbackBrandIcon;
export const TbBrandApple = fallbackBrandIcon;
export const TbBrandAppstore = fallbackBrandIcon;
export const TbBrandBitbucket = fallbackBrandIcon;
export const TbBrandGithubFilled = fallbackBrandIcon;
export const TbBrandReddit = fallbackBrandIcon;
export const TbBrandSolidjs = fallbackBrandIcon;
export const TbBrandTailwind = fallbackBrandIcon;
export const TbCheck = TbOutlineCheck;
export const TbChevronRight = TbOutlineChevronRight;
export const TbChevronDown = TbOutlineChevronDown;
export const TbCopy = TbOutlineCopy;
export const TbArrowRight = TbOutlineArrowRight;
export const TbMoon = TbOutlineMoon;
export const TbReload = TbOutlineReload;
export const TbStarFilled = TbFillStar;
export const TbSun = TbOutlineSun;
