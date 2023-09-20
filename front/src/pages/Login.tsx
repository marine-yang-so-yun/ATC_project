import apiService from "api";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "styles/page/login.style";
import { setCookie } from "utils/cookieUtils";

const Login = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ id: "", password: "" });
	const { id, password } = form;

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id || !password) return;

		try {
			const res = await apiService.loginService.login({
				username: id,
				password,
			});

			const token = res.headers.authorization.split(" ")[1];

			const decodedUserInfo: { username: string; exp: number } =
				jwtDecode(token);
			const expires = new Date(decodedUserInfo.exp * 1000);

			setCookie("accessToken", token, { path: "/", expires });
			localStorage.setItem("username", decodedUserInfo.username);

			alert(`${decodedUserInfo.username}님 환영합니다!`);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const changeFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<S.LoginContainer>
			<S.LoginImg
				src={process.env.PUBLIC_URL + "/container_terminal.jpg"}
				alt="컨테이너 터미널 사진"
			/>
			<S.LoginFormContainer>
				<Link to="/">
					<img
						src={process.env.PUBLIC_URL + "/logo.png"}
						alt="토탈 소프트 뱅크 로고"
					/>
				</Link>
				<form onSubmit={(e) => onSubmit(e)}>
					<S.LoginTextInput
						name="id"
						type="text"
						value={id}
						onChange={changeFormValue}
						placeholder="아이디"
						required
						autoFocus
					/>
					<S.LoginTextInput
						name="password"
						type="password"
						value={password}
						onChange={changeFormValue}
						placeholder="비밀번호"
						required
					/>
					<S.LoginSubmitBtn type="submit">로그인</S.LoginSubmitBtn>
				</form>
			</S.LoginFormContainer>
		</S.LoginContainer>
	);
};

export default Login;
