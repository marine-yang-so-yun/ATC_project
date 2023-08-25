import styled from "styled-components";
import { theme } from "styles/theme";

export const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 10px 5%;
`;

export const NavBtn = styled.button`
	display: inline-flex;
	justify-content: center;
	align-items: center;

	color: ${theme.color.purple};
	font-size: ${theme.fontSize.lg};
	font-weight: 600;

	transition: all 250ms ease-in-out;

	& + & {
		margin-left: 30px;
	}

	& > svg {
		margin-right: 5px;
	}

	& > span {
		margin-bottom: 3px;
	}

	&:hover {
		color: ${theme.color.lightPurple};
	}
`;
