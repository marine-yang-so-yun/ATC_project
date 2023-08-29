import React from "react";
import { Link } from "react-router-dom";
import { NoticeData } from "types/api";

const NoticeItem = ({ notice }: { notice: NoticeData }) => {
	const { noticeseq, noticetitle, noticewriter, noticedate } = notice;

	return (
		<li>
			<span>{noticeseq}</span>
			<span>
				<Link to={"/notice/" + noticeseq}>{noticetitle}</Link>
			</span>
			<span>{noticewriter}</span>
			<span>{noticedate.toISOString().slice(0, 10)}</span>
		</li>
	);
};

export default NoticeItem;
