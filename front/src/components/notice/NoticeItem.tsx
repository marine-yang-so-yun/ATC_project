import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "styles/notice/noticeList.style";
import { NoticeData } from "types/api";

const NoticeItem = ({ notice }: { notice: NoticeData }) => {
	const { noticeseq, noticeurgency, noticetitle, noticedate, noticedetail } =
		notice;
	const qs = useLocation().search;
	const searchParams = new URLSearchParams(qs);
	const id = searchParams.get("id") || "";
	const [isContentOpen, setIsContentOpen] = useState<boolean>(
		Number(id) === notice.noticeseq
	);

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
			<S.NoticeContent $isContentOpen={isContentOpen}>
				{noticedetail}
			</S.NoticeContent>
		</li>
	);
};

export default NoticeItem;
