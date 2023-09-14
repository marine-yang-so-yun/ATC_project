import React, { useEffect, useState } from "react";
import DataList from "./DataList";
import { SectionContainer, SectionTitle } from "styles/commons";
import apiService from "api";
import { ContainerWorkData } from "types/api";
import { DataContentOl } from "styles/components/home/dataList.style";

const YardWork = () => {
	const [workList, setWorkList] = useState<ContainerWorkData[]>([]);
	const cols = [
		"컨테이너번호",
		"작업코드",
		"모선항차",
		"위치",
		// "작업시작시간",
		"작업완료시간",
		// "소요시간",
		// "비고",
		// "선석",
		// "선박명",
		// "입항일시",
		// "출항일시",
		// "반입마감일시",
	];
	const workCodeKo: { [workCode: string]: string } = {
		VU: "양하",
		VL: "적하",
		GR: "반입",
		GD: "반출",
		TM: "구내이적",
		TS: "임의이적",
	};

	useEffect(() => {
		const fetchWorkList = async () => {
			let { data } = await apiService.containerService.getWorkList();
			data = data.map((item) => ({ ...item, timeEnd: new Date(item.timeEnd) }));
			setWorkList(data);
		};
		fetchWorkList();
	}, []);

	return (
		<SectionContainer>
			<SectionTitle>야드 작업 현황</SectionTitle>
			<DataList header={cols} />
			<DataContentOl $count={cols.length}>
				{workList.slice(0, 10).map((item, idx) => (
					<li key={item.container + idx}>
						<span>{item.container}</span>
						<span>{workCodeKo[item.workCode]}</span>
						<span>{item.ship + item.voyage}</span>
						<span>
							{item.block +
								item.bay.toString().padStart(2, "0") +
								item.row.toString().padStart(2, "0") +
								item.tier.toString().padStart(2, "0")}
						</span>
						<span>{item.timeEnd.toLocaleString()}</span>
					</li>
				))}
			</DataContentOl>
		</SectionContainer>
	);
};

export default YardWork;
