import styled from "styled-components";
import { theme } from "./theme";

export const MainContainer = styled.main`
	padding: 1% 5%;
`;

export const MainTitle = styled.h1`
	margin-bottom: 15px;
	font-size: ${theme.fontSize.xxl};
	font-weight: 600;
`;

export const SectionTitle = styled.h2`
	font-size: ${theme.fontSize.xl};
	font-weight: 600;
`;
