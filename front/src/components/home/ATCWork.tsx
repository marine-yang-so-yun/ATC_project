import React from "react";
import DataList from "./DataList";
import { SectionContainer, SectionTitle } from "styles/commons";

const ATCWork = () => {
	const cols = [
		"컨테이너번호",
		"작업코드",
		"위치",
		"작업시작시간",
		"작업완료시간",
	];

	return (
		<SectionContainer>
			<SectionTitle>ATC 작업 현황</SectionTitle>
			<DataList header={cols} />
		</SectionContainer>
	);
};

export default ATCWork;
