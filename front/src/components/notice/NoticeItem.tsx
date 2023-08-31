import React from "react";
import { Link } from "react-router-dom";
import { NoticeData } from "types/api";

const NoticeItem = ({ notice }: { notice: NoticeData }) => {
	const { noticeseq, noticeurgency, noticetitle, noticedate } = notice;

	return (
		<li>
			<span>{noticeseq}</span>
			<span>{noticeurgency ? "공지" : "알림"}</span>
			<span>
				<Link to={"/notice/" + noticeseq}>{noticetitle}</Link>
			</span>
			<span>{noticedate.toISOString().slice(0, 10)}</span>
		</li>
	);
};

export default NoticeItem;
