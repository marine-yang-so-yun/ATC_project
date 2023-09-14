import apiService from "api";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "utils/localStorage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
	NoticeTitle,
	TitleContainer,
} from "styles/page/notice/noticeList.style";
import * as S from "styles/page/notice/writeNotice.style";
import { LightPurpleBtn } from "styles/commons";
import { NoticeData } from "types/api";
import { getNoticeAsync } from "store/notice";
import { useDispatch } from "react-redux";

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

const WriteNotice = () => {
	const location = useLocation();
	const state: Omit<NoticeData, "noticedate"> | null = location.state;
	const [form, setForm] = useState({
		title: state?.noticetitle || "",
		urgency: state?.noticeurgency || false,
	});
	const [content, setContent] = useState<string>(state?.noticedetail || "");
	const { title, urgency } = form;
	const writer = getUser()?.replaceAll('"', "") || "";
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title || !content || !writer) return;

		if (state) {
			await apiService.noticeService.putNotice({
				noticeseq: state.noticeseq,
				noticetitle: title,
				noticewriter: writer,
				noticeurgency: urgency,
				noticedetail: content,
			});
			await dispatch<any>(getNoticeAsync());
		} else {
			await apiService.noticeService.postNotice({
				noticetitle: title,
				noticewriter: writer,
				noticeurgency: urgency,
				noticedetail: content,
			});
			await dispatch<any>(getNoticeAsync());
		}

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
				<LightPurpleBtn type="submit">
					{state ? "수정하기" : "작성하기"}
				</LightPurpleBtn>
			</S.CreateNoticeForm>
		</>
	);
};

export default WriteNotice;
