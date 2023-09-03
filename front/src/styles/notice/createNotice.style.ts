import styled from "styled-components";
import { theme } from "styles/theme";

export const CreateNoticeForm = styled.form`
	padding: 1% 10%;
	text-align: center;

	& > .quill {
		margin-bottom: 15px;
		.ql-container {
			height: 40vh;
		}
	}

	& > input[type="checkbox"] {
		accent-color: ${theme.color.lightPurple};
	}
`;

export const NoticeTitleInput = styled.input`
	width: 50%;
	padding: 1%;
	margin-right: 20px;
	margin-bottom: 15px;
	border-bottom: 2px solid ${theme.color.lightGray};
	font-weight: 600;
	transition: all 250ms ease-in-out;

	&:focus {
		border-bottom: 2px solid ${theme.color.lightPurple};
	}
`;
