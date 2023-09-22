import styled from "styled-components";
import { SectionTitle } from "styles/commons";
import { theme } from "styles/theme";

export const YardWorkTitle = styled(SectionTitle)`
	width: fit-content;
	cursor: pointer;
	transition: all 250ms ease-in-out;

	&:hover {
		color: ${theme.color.lightPurple};
	}
`;
