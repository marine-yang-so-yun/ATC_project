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
	margin-bottom: 0;
`;

export const CateBtn = styled.button<{ $active: boolean }>`
	margin-top: 30px;
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
			width: 10%;
			padding: 10px 0;
			text-align: center;

			&:nth-child(3) {
				width: 70%;
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
			width: 10%;
			padding: 10px 0;
			text-align: center;

			&:nth-child(3) {
				width: 70%;
			}
		}
	}
`;

export const NoticeTitleBtn = styled.button<{ $isContentOpen: boolean }>`
	transition: all 250ms ease-in-out;
	${({ $isContentOpen }) =>
		$isContentOpen &&
		css`
			font-size: ${theme.fontSize.md};
			font-weight: 600;
		`}
`;

export const NoticeContent = styled.div<{ $isContentOpen: boolean }>`
	display: ${({ $isContentOpen }) => ($isContentOpen ? "block" : "none")};
	position: relative;
	margin-bottom: 1%;
	left: 20%;
	width: 70%;
	padding: 1%;
	background-color: ${theme.color.lightGray};
`;

export const NoticeBtnContainer = styled.div`
	display: flex;
	justify-content: space-around;

	& > button {
		width: 100%;
		margin: 1%;
		padding: 5px 0;
		background-color: ${theme.color.lightPurple};
		color: ${theme.color.white};
		transition: all 250ms ease-in-out;

		&:hover {
			background-color: ${theme.color.purple};
		}
	}
`;
