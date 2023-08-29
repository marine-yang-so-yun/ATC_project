import styled from "styled-components";
import { theme } from "styles/theme";

export const BannerContainer = styled.aside`
	display: flex;
	justify-content: space-between;
	padding: 1.5% 5%;
	width: 100vw;
	background-color: ${theme.color.purple};
`;

export const BannerBarContainer = styled.div`
	width: 48%;
	padding: 1% 1.5%;
	border-radius: 50px;
	background-color: ${theme.color.lightGray};
	font-size: ${theme.fontSize.lg};
	font-weight: 600;
`;
