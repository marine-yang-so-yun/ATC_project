import styled from "styled-components";
import { theme } from "styles/theme";

export const DataListOl = styled.ol<{ $count: number }>`
	width: 100%;
	background-color: ${theme.color.lightGray};

	& > li > span {
		display: inline-block;
		width: ${({ $count }) => `${100 / $count}%`};
		padding: 10px 0;
		text-align: center;
	}
`;

export const DataListHeaderOl = styled(DataListOl)`
	font-size: ${theme.fontSize.md};
	font-weight: 600;
`;
