import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		color: {
			white: "#fff";
			black: "#222";
			lightGray: "#E6E6E6";
			gray: "#767676";
			purple: "#323470";
			lightPurple: "#8E8FBD";
		};
		fontSize: {
			xs: "0.75rem";
			sm: "0.875rem";
			base: "1rem";
			md: "1.125rem";
			lg: "1.25rem";
			xl: "1.5rem";
			xxl: "2rem";
		};
	}
}
