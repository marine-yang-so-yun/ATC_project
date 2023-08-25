import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
	color: {
		white: "#fff",
		black: "#222",
		lightGray: "#F2F2F2",
		gray: "#767676",
		purple: "#323470",
	},
	fontSize: {
		xs: "0.75rem",
		sm: "0.875rem",
		base: "1rem",
		md: "1.125rem",
		lg: "1.25rem",
		xl: "1.5rem",
		xxl: "2rem",
	},
};

const customMediaQuery = (maxWidth: number): string =>
	`@media (max-width: ${maxWidth}px)`;

export const media = {
	custom: customMediaQuery,
	pc: customMediaQuery(1281),
	tabletMax: customMediaQuery(1025),
	tabletMin: customMediaQuery(769),
	mobile: customMediaQuery(481),
};
