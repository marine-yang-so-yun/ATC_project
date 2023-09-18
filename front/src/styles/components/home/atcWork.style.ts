import styled, { css } from "styled-components";
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
			margin-bottom: 10px;
			font-size: ${theme.fontSize.lg};
			font-weight: 600;
			text-align: center;
		}
	}
`;
