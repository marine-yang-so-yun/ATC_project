import styled from "styled-components";
import { theme } from "styles/theme";

export const PaginationContainer = styled.div`
	text-align: center;
	margin-bottom: 25px;

	& > button {
		padding: 2px 5px;
		font-weight: 600;
		transition: all 250ms ease-in-out;

		&:enabled:hover {
			color: ${theme.color.lightPurple};
		}

		&.active {
			color: ${theme.color.purple};
			font-size: ${theme.fontSize.md};

			&:hover {
				color: ${theme.color.purple};
			}
		}
	}

	& > button + button {
		margin-left: 20px;
	}
`;
