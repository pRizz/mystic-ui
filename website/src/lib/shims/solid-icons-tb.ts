export * from "solid-icons-tb-source";

import {
	TbFillStar,
	TbOutlineArrowRight,
	TbOutlineBell,
	TbOutlineBrandApple,
	TbOutlineBrandBitbucket,
	TbOutlineBrandReddit,
	TbOutlineCalendar,
	TbOutlineCheck,
	TbOutlineChevronDown,
	TbOutlineChevronRight,
	TbOutlineCopy,
	TbOutlineCursorText,
	TbOutlineFileText,
	TbOutlineGlobe,
	TbOutlineMoon,
	TbOutlineReload,
	TbOutlineSquare,
	TbOutlineSun,
} from "solid-icons-tb-source";

type IconProps = Parameters<typeof TbOutlineSquare>[0];

const fallbackBrandIcon = (props: IconProps) => TbOutlineSquare(props);

export const TbBrandAbstract = fallbackBrandIcon;
export const TbBrand4chan = fallbackBrandIcon;
export const TbBrandAdobe = fallbackBrandIcon;
export const TbBrandAmongUs = fallbackBrandIcon;
export const TbBrandAppstore = fallbackBrandIcon;
export const TbBrandGithubFilled = fallbackBrandIcon;
export const TbBrandSolidjs = fallbackBrandIcon;
export const TbBrandTailwind = fallbackBrandIcon;
export const TbArrowRight = TbOutlineArrowRight;
export const TbBell = TbOutlineBell;
export const TbBrandApple = TbOutlineBrandApple;
export const TbBrandBitbucket = TbOutlineBrandBitbucket;
export const TbBrandReddit = TbOutlineBrandReddit;
export const TbCalendar = TbOutlineCalendar;
export const TbCheck = TbOutlineCheck;
export const TbChevronDown = TbOutlineChevronDown;
export const TbChevronRight = TbOutlineChevronRight;
export const TbCopy = TbOutlineCopy;
export const TbCursorText = TbOutlineCursorText;
export const TbFileText = TbOutlineFileText;
export const TbGlobe = TbOutlineGlobe;
export const TbMoon = TbOutlineMoon;
export const TbReload = TbOutlineReload;
export const TbStarFilled = TbFillStar;
export const TbSun = TbOutlineSun;
