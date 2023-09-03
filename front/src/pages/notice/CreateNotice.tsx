import apiService from "api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "utils/localStorage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NoticeTitle, TitleContainer } from "styles/notice/noticeList.style";
import * as S from "styles/notice/createNotice.style";
import { LightPurpleBtn } from "styles/commons";

const modules = {
	toolbar: {
		container: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			[{ align: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			[
				{
					color: ["#000000", "#e60000", "#0066cc", "#ffffff"],
				},
				{
					background: ["#000000", "#e60000", "#0066cc", "#ffffff"],
				},
			],
			["image", "video"],
			["clean"],
		],
	},
};

const CreateNotice = () => {
	const [form, setForm] = useState({ title: "", urgency: false });
	const [content, setContent] = useState<string>("");
	const { title, urgency } = form;
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

		setForm({ title: "", urgency: false });
		setContent("");
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
			<TitleContainer>
				<NoticeTitle>공지사항</NoticeTitle>
			</TitleContainer>
			<S.CreateNoticeForm onSubmit={(e) => onSubmit(e)}>
				<S.NoticeTitleInput
					name="title"
					type="text"
					value={title}
					onChange={changeFormValue}
					placeholder="제목"
					required
					autoFocus
				/>
				<input
					name="urgency"
					type="checkbox"
					checked={urgency}
					onChange={changeFormValue}
					id="urgency"
				/>
				<label htmlFor="urgency">공지</label>
				<ReactQuill
					value={content}
					onChange={setContent}
					modules={modules}
					theme="snow"
				/>
				<LightPurpleBtn type="submit">작성하기</LightPurpleBtn>
			</S.CreateNoticeForm>
		</>
	);
};

export default CreateNotice;
