import React, { useEffect, useRef, useState } from "react";
import {
	BannerBarContainer,
	Carousel,
	BannerBarLink,
} from "styles/components/banner/banner";
import { NoticeData } from "types/api";

const noticeSample: NoticeData[] = [
	{
		noticeseq: 1,
		noticewriter: "member",
		noticetitle: "test1",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
	{
		noticeseq: 2,
		noticewriter: "member",
		noticetitle: "test2",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
	{
		noticeseq: 3,
		noticewriter: "member",
		noticetitle: "test3",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
	{
		noticeseq: 4,
		noticewriter: "member",
		noticetitle: "test4",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
	{
		noticeseq: 5,
		noticewriter: "member",
		noticetitle: "test5",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
	{
		noticeseq: 1,
		noticewriter: "member",
		noticetitle: "test1",
		noticeurgency: false,
		noticedetail: "content",
		noticedate: new Date(),
	},
];
const NoticeBar = () => {
	const [count, setCount] = useState<number>(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	const [currentPage, setCurrentPage] = useState<number>(0);

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

	return (
		<BannerBarContainer>
			<Carousel $count={count} ref={carouselRef}>
				{noticeSample.map((notice, idx) => (
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
