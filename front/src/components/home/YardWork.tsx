import React from "react";
import DataList from "./DataList";
import { SectionContainer, SectionTitle } from "styles/commons";

const YardWork = () => {
	const cols = [
		"컨테이너번호",
		"작업코드",
		"모선항차",
		"위치",
		"작업시작시간",
		"작업완료시간",
		"소요시간",
		"비고",
		"선석",
		"선박명",
		"입항일시",
		"출항일시",
		"반입마감일시",
	];

	return (
		<SectionContainer>
			<SectionTitle>야드 작업 현황</SectionTitle>
			<DataList header={cols} />
		</SectionContainer>
	);
};

export default YardWork;
