import React from "react";
import NoticeItem from "components/notice/NoticeItem";
import { MainTitle } from "styles/commons";
import * as S from "styles/notice/noticeList.style";
import { useSelector } from "react-redux";
import { AppState } from "store";

const NoticeList = () => {
	const notices: AppState["notices"] = useSelector(
		(state: AppState) => state.notices
	);

	return (
		<>
			<MainTitle>공지사항</MainTitle>
			<S.NoticeUlHeader>
				<li>
					<span>번호</span>
					<span>제목</span>
					<span>작성자</span>
					<span>작성일</span>
				</li>
			</S.NoticeUlHeader>
			<S.NoticeUl>
				{notices.map((notice) => (
					<NoticeItem key={notice.noticeseq} notice={notice} />
				))}
			</S.NoticeUl>
		</>
	);
};

export default NoticeList;
