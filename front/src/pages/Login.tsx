import apiService from "api";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
			localStorage.setItem(
				"username",
				JSON.stringify(decodedUserInfo.username)
			);

			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const changeFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<>
			<form onSubmit={(e) => onSubmit(e)}>
				<input
					name="id"
					type="text"
					value={id}
					onChange={changeFormValue}
					placeholder="아이디"
					required
				/>
				<input
					name="password"
					type="password"
					value={password}
					onChange={changeFormValue}
					placeholder="비밀번호"
					required
				/>
				<button type="submit">로그인</button>
			</form>
		</>
	);
};

export default Login;
