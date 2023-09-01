import styled, { css } from "styled-components";
import { MainTitle } from "styles/commons";
import { theme } from "styles/theme";

export const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3%;
	background-color: ${theme.color.purple};
`;

export const NoticeTitle = styled(MainTitle)`
	color: ${theme.color.white};
	margin-bottom: 30px;
`;

export const CateBtn = styled.button<{ $active: boolean }>`
	padding: 10px 15px;
	background-color: ${theme.color.white};
	font-weight: 600;
	transition: all 250ms ease-in-out;

	&:first-child {
		border-radius: 10px 0 0 10px;
	}

	&:last-child {
		border-radius: 0 10px 10px 0;
	}

	&:hover {
		background-color: ${({ $active }) =>
			$active ? `${theme.color.lightPurple}` : `${theme.color.lightGray}`};
	}

	${({ $active }) =>
		$active &&
		css`
			background-color: ${theme.color.lightPurple};
			color: ${theme.color.white};
		`}
`;

export const NoticeOlContainer = styled.div`
	padding: 1% 5%;
`;

export const NoticeOl = styled.ol`
	width: 100%;

	& > li {
		& > span {
			display: inline-block;
			width: 12.5%;
			padding: 10px 0;
			text-align: center;

			&:nth-child(3) {
				width: 50%;
			}
		}
	}
`;

export const NoticeHeaderOl = styled(NoticeOl)`
	font-size: ${theme.fontSize.md};
	font-weight: 600;
	background-color: ${theme.color.lightGray};
`;

export const NoticeContentOl = styled.ol`
	& > li {
		border-bottom: 1px solid ${theme.color.lightGray};
		width: 100%;

		& > div > span {
			display: inline-block;
			width: 12.5%;
			padding: 10px 0;
			text-align: center;

			&:nth-child(3) {
				width: 50%;
			}
		}

		& > p {
			display: none;
			padding: 0 25%;
		}
	}
`;
