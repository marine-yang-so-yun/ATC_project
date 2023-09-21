import styled, { css } from "styled-components";
import { SectionTitle } from "styles/commons";
import { theme } from "styles/theme";

export const WorkByATCContainer = styled.div<{ $count: number }>`
	${({ $count }) =>
		$count > 1 &&
		css`
			display: flex;
			justify-content: space-between;
		`}

	& > div {
		width: ${({ $count }) => $count > 1 && `${100 / $count - 1}%`};

		& > h3 {
			width: fit-content;
			margin: 0 auto 15px;
			font-size: ${theme.fontSize.lg};
			font-weight: 600;
			text-align: center;
			cursor: pointer;
			transition: all 250ms ease-in-out;

			&:hover {
				color: ${theme.color.lightPurple};
			}
		}
	}
`;
