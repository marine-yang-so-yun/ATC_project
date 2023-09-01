import React from "react";
import { NoticeData } from "types/api";

const NoticeItem = ({ notice }: { notice: NoticeData }) => {
	const { noticeseq, noticeurgency, noticetitle, noticedate, noticedetail } =
		notice;

	return (
		<li>
			<div>
				<span>{noticeseq}</span>
				<span>{noticeurgency ? "공지" : "알림"}</span>
				<span>{noticetitle}</span>
				<span>{noticedate.toISOString().slice(0, 10)}</span>
			</div>
			<p>{noticedetail}</p>
		</li>
	);
};

export default NoticeItem;
