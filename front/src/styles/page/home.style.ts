import styled from "styled-components";
import { SectionContainer } from "styles/commons";
import { theme } from "styles/theme";

export const MainSectionContainer = styled(SectionContainer)`
	display: flex;
	justify-content: space-around;
	align-items: center;

	& > div {
		display: flex;
		align-items: center;

		& > span {
			position: relative;
			margin-right: 25px;
			font-size: ${theme.fontSize.lg};
			font-weight: 600;

			&::after {
				content: "";
				position: absolute;
				top: -5px;
				right: -10px;
				width: 10px;
				height: 10px;
				background-color: red;
				border-radius: 100px;
			}
		}

		& > button {
			padding: 5px 25px;
			font-weight: 600;
			border-radius: 5px;
			background-color: ${theme.color.lightGray};

			&:hover {
				background-color: ${theme.color.lightPurple};
			}
		}
	}
`;
