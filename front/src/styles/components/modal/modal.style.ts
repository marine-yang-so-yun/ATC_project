import { GrClose } from "react-icons/gr";
import styled from "styled-components";
import { theme } from "styles/theme";

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
`;

export const ModalBackdrop = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalView = styled.div`
	width: 500px;
	padding: 40px 50px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${theme.color.white};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
`;

export const CloseModalBtn = styled(GrClose)`
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: ${theme.fontSize.xl};
	cursor: pointer;

	& > path {
		stroke: ${theme.color.purple};
		stroke-width: 4;
	}
`;

export const SelectBtnContainer = styled.div`
	padding: 10px 5px;
	width: 100%;

	& > button {
		width: 22%;
		margin-right: 3%;
		margin-bottom: 10px;
		&:nth-child(4n) {
			margin-right: 0;
		}
		padding: 5px 10px;
		border-radius: 5px;
		background-color: ${theme.color.lightPurple};
		color: ${theme.color.white};
		transition: all 250ms ease-in-out;

		&:hover {
			background-color: ${theme.color.purple};
		}
	}
`;
