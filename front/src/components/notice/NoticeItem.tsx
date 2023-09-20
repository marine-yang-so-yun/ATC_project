import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import * as S from "styles/page/notice/noticeList.style";
import { NoticeData } from "types/api";
import "react-quill/dist/quill.snow.css";
import apiService from "api";
import { getUser } from "utils/localStorage";
import { useDispatch } from "react-redux";
import { getNoticeAsync } from "store/notice";

const NoticeItem = ({ notice }: { notice: NoticeData }) => {
	const { noticeseq, noticeurgency, noticetitle, noticedate, noticedetail } =
		notice;
	const qs = useLocation().search;
	const searchParams = new URLSearchParams(qs);
	const id = searchParams.get("id") || "";
	const [isContentOpen, setIsContentOpen] = useState<boolean>(
		Number(id) === notice.noticeseq
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const editNotice = () => {
		navigate("/editnotice", {
			state: { noticeseq, noticetitle, noticeurgency, noticedetail },
		});
	};

	const deleteNotice = async (seq: number) => {
		// eslint-disable-next-line no-restricted-globals
		const isDelete = confirm("해당 공지사항을 삭제하겠습니까?");
		if (isDelete) {
			await apiService.noticeService.deleteNotice(seq);
			await dispatch<any>(getNoticeAsync());
		}
	};

	return (
		<li>
			<div>
				<span>{noticeseq}</span>
				<span>{noticeurgency ? "공지" : "알림"}</span>
				<span>
					<S.NoticeTitleBtn
						$isContentOpen={isContentOpen}
						onClick={() => setIsContentOpen(!isContentOpen)}
					>
						{noticetitle}
					</S.NoticeTitleBtn>
				</span>
				<span>{noticedate.toISOString().slice(0, 10)}</span>
			</div>
			<S.NoticeContent className="ql-snow" $isContentOpen={isContentOpen}>
				<div
					className="ql-editor"
					dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(noticedetail) }}
				/>
				{getUser() === "admin" && (
					<S.NoticeBtnContainer>
						<button onClick={() => editNotice()}>수정</button>
						<button onClick={() => deleteNotice(noticeseq)}>삭제</button>
					</S.NoticeBtnContainer>
				)}
			</S.NoticeContent>
		</li>
	);
};

export default NoticeItem;
