import styled from "styled-components";
import { theme } from "styles/theme";

export const FooterContainer = styled.footer`
	display: flex;
	flex-direction: column;
	padding: 3% 5%;
	background-color: ${theme.color.purple};
	color: ${theme.color.white};
	text-align: center;

	& > ul {
		margin: 0 auto 15px;
		display: flex;

		& > li + li {
			margin-left: 15px;
		}
	}
`;
