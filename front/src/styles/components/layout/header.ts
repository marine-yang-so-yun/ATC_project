import styled, { css } from "styled-components";
import { theme } from "styles/theme";

export const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 90px;
	padding: 0 5%;
`;

export const NavBtn = styled.button<{ $isMenuOpen?: boolean }>`
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

	${({ $isMenuOpen }) =>
		$isMenuOpen &&
		css`
			color: ${theme.color.lightPurple};
		`}
`;

export const NavContainer = styled.nav<{ $isMenuOpen: boolean }>`
	display: ${({ $isMenuOpen }) => ($isMenuOpen ? "block" : "none")};
	position: fixed;
	top: 90px;
	bottom: 0;
	right: 0;
	width: 30vw;
	background-color: ${theme.color.white};
	color: ${theme.color.purple};
	font-weight: 600;
`;

export const NavListItem = styled.li`
	width: 100%;
	font-size: ${theme.fontSize.md};
	text-align: center;
	cursor: pointer;

	&:hover {
		background-color: ${theme.color.lightPurple};
		color: ${theme.color.white};
	}

	& > a {
		display: block;
		width: 100%;
		padding: 5%;
	}
`;
