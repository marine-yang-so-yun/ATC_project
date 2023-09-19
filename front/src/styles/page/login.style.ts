import styled from "styled-components";
import { theme } from "styles/theme";

export const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LoginImg = styled.img`
	width: 60%;
	height: 100vh;
`;

export const LoginFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40%;
	height: 100vh;
	background-color: ${theme.color.lightPurple};

	& > a {
		margin-bottom: 40px;
	}

	& > form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const LoginTextInput = styled.input`
	margin-bottom: 15px;
	border-bottom: 2px solid ${theme.color.gray};

	&:focus {
		border-bottom: 2px solid ${theme.color.purple};
		color: ${theme.color.white};
	}
`;

export const LoginSubmitBtn = styled.button`
	width: 100%;
	padding: 5px 0;
	border-radius: 5px;
	background-color: ${theme.color.purple};
	color: ${theme.color.white};
	transition: all 250ms ease-in-out;

	&:hover {
		transform: scale(1.05);
	}
`;
