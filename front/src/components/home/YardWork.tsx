import React, { useEffect, useState } from "react";
import DataList from "components/DataList";
import { SectionContainer, SectionTitle } from "styles/commons";
import { SocketYardData } from "types/api";
import { DataContentOl } from "styles/components/dataList.style";

const YardWork = () => {
	const [workList, setWorkList] = useState<SocketYardData[]>([]);
	const wsUrl = process.env.REACT_APP_SOCKET_YARD;
	const cols = ["컨테이너번호", "작업코드", "모선항차", "위치", "작업완료시간"];
	const workCodeKo: { [workCode: string]: string } = {
		VU: "양하",
		VL: "적하",
		GR: "반입",
		GD: "반출",
		TM: "구내이적",
		TS: "임의이적",
	};

	useEffect(() => {
		if (!wsUrl) return;

		const ws = new WebSocket(wsUrl);

		ws.onmessage = (event) => {
			let newData: SocketYardData[] = JSON.parse(event.data);
			newData = newData.map((item) => ({
				...item,
				timeEnd: new Date(item.timeEnd),
			}));
			setWorkList(newData);
		};
	}, [wsUrl]);

	if (workList.length === 0) return null;

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
							{`${item.block1}-${item.bay1
								.toString()
								.padStart(2, "0")}-${item.row1
								.toString()
								.padStart(2, "0")}-${item.tier1.toString().padStart(2, "0")}`}
						</span>
						<span>
							{item.timeEnd.toLocaleDateString()}
							<br />
							{item.timeEnd.toLocaleTimeString()}
						</span>
					</li>
				))}
			</DataContentOl>
		</SectionContainer>
	);
};

export default YardWork;
