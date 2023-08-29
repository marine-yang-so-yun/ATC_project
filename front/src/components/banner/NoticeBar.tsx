import React from "react";
import { Link } from "react-router-dom";
import { BannerBarContainer } from "styles/components/banner/banner";
import { NoticeData } from "types/api";

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
const NoticeBar = () => {
	return (
		<BannerBarContainer>
			<Link to={"/notice/" + noticeSample[0].noticeseq}>
				{noticeSample[0].noticetitle}
			</Link>
		</BannerBarContainer>
	);
};

export default NoticeBar;
