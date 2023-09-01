import styled from "styled-components";
import { theme } from "./theme";

export const MainTitle = styled.h1`
	margin-bottom: 15px;
	font-size: ${theme.fontSize.xxl};
	font-weight: 600;
`;

export const SectionTitle = styled.h2`
	font-size: ${theme.fontSize.xl};
	font-weight: 600;
`;

export const LightPurpleBtn = styled.button`
	margin-bottom: 10px;
	padding: 5px 10px;
	border-radius: 5px;
	background-color: ${theme.color.lightPurple};
	color: ${theme.color.white};
	font-weight: 600;
	transition: all 250ms ease-in-out;

	&:hover {
		background-color: ${theme.color.purple};
	}
`;
