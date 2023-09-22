import styled, { css } from "styled-components";
import { theme } from "./theme";
import { CSVLink } from "react-csv";

export const MainTitle = styled.h1`
	margin-bottom: 15px;
	font-size: ${theme.fontSize.xxl};
	font-weight: 600;
`;

export const SectionTitle = styled.h2`
	margin-bottom: 15px;
	font-size: ${theme.fontSize.xl};
	font-weight: 600;
`;

export const LightPurpleBtn = styled.button`
	margin-bottom: 10px;
	padding: 5px 10px;
	border-radius: 5px;
	background-color: ${theme.color.lightPurple};
	color: ${theme.color.white};
	font-weight: 600;
	transition: all 250ms ease-in-out;

	&:hover {
		background-color: ${theme.color.purple};
	}
`;

export const SectionContainer = styled.section`
	padding: 2% 5%;
`;

export const SubPageTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3%;
	background-color: ${theme.color.purple};
`;

export const SubPageTitle = styled(MainTitle)`
	color: ${theme.color.white};
	margin-bottom: 0;
`;

export const SubpageCateBtn = styled.button<{ $active: boolean }>`
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

export const CSVDownloadBtn = styled(CSVLink)`
	display: inline-block;
	margin-bottom: 15px;
	padding: 10px;
	border-radius: 5px;
	background-color: ${theme.color.lightPurple};
	color: ${theme.color.white};
	font-weight: 600;
	transition: all 250ms ease-in-out;

	&:hover {
		background-color: ${theme.color.purple};
	}
`;

export const FlexSpaceBetweenDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;
