import React from "react";
import { NoticeData } from "types/api";
import NoticeItem from "./NoticeItem";
import { MainTitle } from "styles/commons";
import { NoticeUl, NoticeUlHeader } from "styles/notice/noticeList";

const noticeSample: NoticeData[] = [
	{
		noticeseq: 1,
		noticewriter: "member",
		noticetitle: "test",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
	{
		noticeseq: 2,
		noticewriter: "member",
		noticetitle: "test",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
];

const NoticeList = () => {
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
				{noticeSample.map((notice) => (
					<NoticeItem key={notice.noticeseq} notice={notice} />
				))}
			</NoticeUl>
		</>
	);
};

export default NoticeList;
