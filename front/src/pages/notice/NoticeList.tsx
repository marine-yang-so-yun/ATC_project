import React, { useEffect, useState } from "react";
import NoticeItem from "components/notice/NoticeItem";
import * as S from "styles/page/notice/noticeList.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { LightPurpleBtn } from "styles/commons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getNoticeAsync } from "store/notice";
import Pagination from "components/notice/Pagination";

const NoticeList = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const notices: AppState["notices"] = useSelector(
		(state: AppState) => state.notices
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const cate = searchParams.get("cate") || "전체";
	const page: number = Number(searchParams.get("page")) || 1;
	const [numPage, setNumPage] = useState<number>(1);
	const offset = (page - 1) * 10;

	if (notices.length === 0) {
		dispatch<any>(getNoticeAsync());
	}

	useEffect(() => {
		setNumPage(
			Math.ceil(
				notices.filter((notice) => {
					switch (cate) {
						case "공지":
							return notice.noticeurgency;
						case "알림":
							return !notice.noticeurgency;
						default:
							return notice;
					}
				}).length / 10
			)
		);
	}, [cate, notices]);

	return (
		<>
			<S.TitleContainer>
				<S.NoticeTitle>공지사항</S.NoticeTitle>
				<div>
					<S.CateBtn
						$active={cate === "전체"}
						onClick={() => setSearchParams({ cate: "전체" })}
					>
						전체
					</S.CateBtn>
					<S.CateBtn
						$active={cate === "공지"}
						onClick={() => setSearchParams({ cate: "공지" })}
					>
						공지
					</S.CateBtn>
					<S.CateBtn
						$active={cate === "알림"}
						onClick={() => setSearchParams({ cate: "알림" })}
					>
						알림
					</S.CateBtn>
				</div>
			</S.TitleContainer>
			<S.NoticeOlContainer>
				<LightPurpleBtn onClick={() => navigate("/createnotice")}>
					글 작성
				</LightPurpleBtn>
				<S.NoticeHeaderOl>
					<li>
						<span>번호</span>
						<span>카테고리</span>
						<span>제목</span>
						<span>작성일</span>
					</li>
				</S.NoticeHeaderOl>
				<S.NoticeContentOl>
					{notices
						.filter((notice) => {
							switch (cate) {
								case "공지":
									return notice.noticeurgency;
								case "알림":
									return !notice.noticeurgency;
								default:
									return notice;
							}
						})
						.slice(offset, offset + 10)
						.map((notice) => (
							<NoticeItem key={notice.noticeseq} notice={notice} />
						))}
				</S.NoticeContentOl>
			</S.NoticeOlContainer>
			{numPage > 1 && (
				<Pagination
					cate={cate}
					page={page}
					numPage={numPage}
					setSearchParams={setSearchParams}
				/>
			)}
		</>
	);
};

export default NoticeList;
