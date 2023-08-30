import React, { useEffect, useRef, useState } from "react";
import {
	BannerBarContainer,
	Carousel,
	BannerBarLink,
} from "styles/components/banner/banner";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeAsync } from "store/notice";
import { AppState } from "store";

const NoticeBar = () => {
	const [count, setCount] = useState<number>(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	const [currentPage, setCurrentPage] = useState<number>(0);
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
					setCurrentPage((pre) => (pre + 1) % 5);
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
	}, [count, currentPage]);

	useEffect(() => {
		dispatch<any>(getNoticeAsync());
	}, [dispatch]);

	return (
		<BannerBarContainer>
			<Carousel $count={count} ref={carouselRef}>
				{notices.map((notice, idx) => (
					<BannerBarLink
						to={"/notice/" + notice.noticeseq}
						key={notice.noticeseq + idx}
					>
						{notice.noticetitle}
					</BannerBarLink>
				))}
			</Carousel>
		</BannerBarContainer>
	);
};

export default NoticeBar;
