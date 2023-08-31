import styled from "styled-components";
import { theme } from "styles/theme";

export const NoticeUl = styled.ul`
	width: 100%;

	& > li {
		display: flex;

		& > span {
			flex: 1 1 0;
			padding: 10px 0;
			text-align: center;
		}
	}
`;

export const NoticeUlHeader = styled(NoticeUl)`
	font-size: ${theme.fontSize.md};
	font-weight: 600;
	border-bottom: 2px solid ${theme.color.lightPurple};
`;
