import React from "react";
import NoticeItem from "components/notice/NoticeItem";
import { MainTitle } from "styles/commons";
import { NoticeUl, NoticeUlHeader } from "styles/notice/noticeList";
import { useSelector } from "react-redux";
import { AppState } from "store";

const NoticeList = () => {
	const notices: AppState["notices"] = useSelector(
		(state: AppState) => state.notices
	);

	return (
		<>
			<MainTitle>공지사항</MainTitle>
			<NoticeUlHeader>
				<li>
					<span>번호</span>
					<span>제목</span>
					<span>작성자</span>
					<span>작성일</span>
				</li>
			</NoticeUlHeader>
			<NoticeUl>
				{notices.map((notice) => (
					<NoticeItem key={notice.noticeseq} notice={notice} />
				))}
			</NoticeUl>
		</>
	);
};

export default NoticeList;
