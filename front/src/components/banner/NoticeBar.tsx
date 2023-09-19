import React, { useEffect, useRef, useState } from "react";
import * as S from "styles/components/banner/banner.style";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeAsync } from "store/notice";
import { AppState } from "store";

const NoticeBar = () => {
	const [count, setCount] = useState<number>(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();
	const notices: AppState["notices"] = useSelector(
		(state: AppState) => state.notices
	);

	const flag = useRef<boolean>(false);
	useEffect(() => {
		const timer = setInterval(
			() => {
				if (count < 5) {
					flag.current = false;
					setCount((pre) => pre + 1);
				} else {
					flag.current = true;
					setCount(0);
				}
			},
			flag.current ? 0 : 3000
		);
		return () => {
			clearInterval(timer);
		};
	}, [count]);

	useEffect(() => {
		dispatch<any>(getNoticeAsync());
	}, [dispatch]);

	if (notices.length === 0) return null;
	return (
		<S.BannerBarContainer>
			<h1>공지사항</h1>
			<S.Carousel $count={count} ref={carouselRef}>
				{notices.slice(0, 5).map((notice) => (
					<S.BannerBarLink
						to={"/notice?id=" + notice.noticeseq}
						key={notice.noticeseq}
					>
						{notice.noticetitle}
					</S.BannerBarLink>
				))}
				<S.BannerBarLink to={"/notice?id=" + notices[0].noticeseq}>
					{notices[0].noticetitle}
				</S.BannerBarLink>
			</S.Carousel>
		</S.BannerBarContainer>
	);
};

export default NoticeBar;
