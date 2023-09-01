import apiService from "api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "utils/localStorage";

const CreateNotice = () => {
	const [form, setForm] = useState({ title: "", urgency: false, content: "" });
	const { title, urgency, content } = form;
	const writer = getUser() || "";
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title || !content || !writer) return;

		await apiService.noticeService.postNotice({
			noticetitle: title,
			noticewriter: writer,
			noticeurgency: urgency,
			noticedetail: content,
		});

		setForm({ title: "", urgency: false, content: "" });
		navigate("/notice");
	};

	const changeFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === "checkbox") {
			setForm({ ...form, [e.target.name]: e.target.checked });
		} else {
			setForm({ ...form, [e.target.name]: e.target.value });
		}
	};

	return (
		<>
			<form onSubmit={(e) => onSubmit(e)}>
				<input
					name="title"
					type="text"
					value={title}
					onChange={changeFormValue}
					placeholder="제목"
					required
				/>
				<input
					name="urgency"
					type="checkbox"
					checked={urgency}
					onChange={changeFormValue}
					id="urgency"
				/>
				<label htmlFor="urgency">공지</label>
				<input
					name="content"
					type="text"
					value={content}
					onChange={changeFormValue}
					placeholder="내용"
					required
				/>
				<button type="submit">작성</button>
			</form>
		</>
	);
};

export default CreateNotice;
