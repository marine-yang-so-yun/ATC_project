import apiService from "api";
import React, { useState } from "react";

const CreateNotice = () => {
	const [form, setForm] = useState({ title: "", urgency: false, content: "" });
	const { title, urgency, content } = form;

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title || !content) return;

		const res = await apiService.noticeService.postNotice({
			noticetitle: title,
			noticewriter: "admin",
			noticeurgency: urgency,
			noticedetail: content,
		});
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
				/>
				<button type="submit">작성</button>
			</form>
		</>
	);
};

export default CreateNotice;
