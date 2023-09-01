import React, { useState } from "react";
import NoticeItem from "components/notice/NoticeItem";
import * as S from "styles/notice/noticeList.style";
import { useSelector } from "react-redux";
import { AppState } from "store";

const NoticeList = () => {
	const [selectedCate, setSelectedCate] = useState<"전체" | "공지" | "알림">(
		"전체"
	);
	const notices: AppState["notices"] = useSelector(
		(state: AppState) => state.notices
	);

	return (
		<>
			<S.TitleContainer>
				<S.NoticeTitle>공지사항</S.NoticeTitle>
				<div>
					<S.CateBtn
						$active={selectedCate === "전체"}
						onClick={() => setSelectedCate("전체")}
					>
						전체
					</S.CateBtn>
					<S.CateBtn
						$active={selectedCate === "공지"}
						onClick={() => setSelectedCate("공지")}
					>
						공지
					</S.CateBtn>
					<S.CateBtn
						$active={selectedCate === "알림"}
						onClick={() => setSelectedCate("알림")}
					>
						알림
					</S.CateBtn>
				</div>
			</S.TitleContainer>
			<S.NoticeOlContainer>
				<S.NoticeHeaderOl>
					<li>
						<span>번호</span>
						<span>카테고리</span>
						<span>제목</span>
						<span>작성일</span>
						<span>조회수</span>
					</li>
				</S.NoticeHeaderOl>
				<S.NoticeContentOl>
					{notices
						.filter((notice) => {
							switch (selectedCate) {
								case "공지":
									return notice.noticeurgency;
								case "알림":
									return !notice.noticeurgency;
								default:
									return notice;
							}
						})
						.map((notice) => (
							<NoticeItem key={notice.noticeseq} notice={notice} />
						))}
				</S.NoticeContentOl>
			</S.NoticeOlContainer>
		</>
	);
};

export default NoticeList;
