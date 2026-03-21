export * from "solid-icons-tb-source";

import {
	TbArrowRight,
	TbBell,
	TbBrandApple,
	TbBrandBitbucket,
	TbBrandReddit,
	TbCalendar,
	TbCheck,
	TbChevronDown,
	TbChevronRight,
	TbCopy,
	TbCursorText,
	TbFileText,
	TbGlobe,
	TbMoon,
	TbReload,
	TbSquare,
	TbStarFilled,
	TbSun,
} from "solid-icons-tb-source";

type IconProps = Parameters<typeof TbSquare>[0];

const fallbackBrandIcon = (props: IconProps) => TbSquare(props);

export const TbBrandAbstract = fallbackBrandIcon;
export const TbBrand4chan = fallbackBrandIcon;
export const TbBrandAdobe = fallbackBrandIcon;
export const TbBrandAmongUs = fallbackBrandIcon;
export const TbBrandAppstore = fallbackBrandIcon;
export const TbBrandGithubFilled = fallbackBrandIcon;
export const TbBrandSolidjs = fallbackBrandIcon;
export const TbBrandTailwind = fallbackBrandIcon;
export const TbFillStar = TbStarFilled;
export const TbOutlineArrowRight = TbArrowRight;
export const TbOutlineBell = TbBell;
export const TbOutlineBrandApple = TbBrandApple;
export const TbOutlineBrandBitbucket = TbBrandBitbucket;
export const TbOutlineBrandReddit = TbBrandReddit;
export const TbOutlineCalendar = TbCalendar;
export const TbOutlineCheck = TbCheck;
export const TbOutlineChevronDown = TbChevronDown;
export const TbOutlineChevronRight = TbChevronRight;
export const TbOutlineCopy = TbCopy;
export const TbOutlineCursorText = TbCursorText;
export const TbOutlineFileText = TbFileText;
export const TbOutlineGlobe = TbGlobe;
export const TbOutlineMoon = TbMoon;
export const TbOutlineReload = TbReload;
export const TbOutlineSquare = TbSquare;
export const TbOutlineSun = TbSun;
