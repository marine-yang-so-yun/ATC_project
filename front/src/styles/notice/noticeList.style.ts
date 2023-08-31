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

export const NoticeUlContainer = styled.div`
	padding: 1% 5%;
`;

export const NoticeUl = styled.ul`
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

export const NoticeHeaderUl = styled(NoticeUl)`
	font-size: ${theme.fontSize.md};
	font-weight: 600;
	background-color: ${theme.color.lightGray};
`;

export const NoticeContentUl = styled(NoticeUl)`
	& > li {
		border-bottom: 1px solid ${theme.color.gray};
	}
`;
