import styled from "styled-components";
import { theme } from "styles/theme";
import { Link } from "react-router-dom";

export const BannerContainer = styled.aside`
	display: flex;
	justify-content: space-between;
	padding: 1.5% 5%;
	width: 100vw;
	background-color: ${theme.color.purple};
`;

export const BannerBarContainer = styled.div`
	width: 48%;
	padding: 0 1.5%;
	border-radius: 50px;
	background-color: ${theme.color.white};
	font-size: ${theme.fontSize.lg};
	font-weight: 600;
	height: 40px;
	overflow: hidden;
`;

export const Carousel = styled.div<{ $count: number }>`
	transition: ${({ $count }) => ($count === 0 ? "" : "all 750ms ease-in-out")};
	transform: ${({ $count }) => `translateY(-${$count * 40}px)`};
`;

export const BannerBarLink = styled(Link)`
	display: block;
	line-height: 40px;
`;
