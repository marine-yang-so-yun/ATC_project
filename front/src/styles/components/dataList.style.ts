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

export const DataContentOl = styled(DataListOl)`
	margin-bottom: 20px;
	background-color: ${theme.color.white};
	border: 2px solid ${theme.color.lightGray};

	& > li {
		display: flex;
		align-items: center;

		& > span {
			line-height: ${theme.fontSize.md};
		}
	}

	& > li + li {
		border-top: 2px solid ${theme.color.lightGray};
	}
`;

export const DataListHeaderOl = styled(DataListOl)`
	font-size: ${theme.fontSize.md};
	font-weight: 600;
`;
