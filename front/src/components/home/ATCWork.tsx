import React, { useEffect, useState } from "react";
import DataList from "./DataList";
import { SectionContainer, SectionTitle } from "styles/commons";
import { AppState } from "store";
import { useSelector } from "react-redux";
import { ContainerWorkData } from "types/api";
import { DataContentOl } from "styles/components/home/dataList.style";
import { WorkByATCContainer } from "styles/components/home/atcWork.style";

const ATCWork = () => {
	const selectedCranes: AppState["blockCrane"]["crane"] = useSelector(
		(state: AppState) => state.blockCrane.crane
	);
	const [workListByAtc, setWorkListByAtc] = useState<ContainerWorkData[]>([]);
	const wsUrl = process.env.REACT_APP_SOCKET_BY_ATC_URL;

	const cols = [
		"컨테이너번호",
		"작업코드",
		"출발위치",
		"도착위치",
		"작업완료시간",
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
		if (!wsUrl || selectedCranes.length === 0) return;

		const ws = new WebSocket(wsUrl);

		ws.onopen = () => {
			ws.send(JSON.stringify(selectedCranes));
		};

		ws.onmessage = (event) => {
			let newData: ContainerWorkData[] = JSON.parse(event.data);
			newData = newData.map((item) => ({
				...item,
				timeEnd: new Date(item.timeEnd),
			}));
			setWorkListByAtc(newData);
		};

		return () => {
			ws.close();
		};
	}, [wsUrl, selectedCranes]);

	if (workListByAtc.length === 0) return null;

	return (
		<SectionContainer>
			<SectionTitle>ATC 작업 현황</SectionTitle>
			<WorkByATCContainer $count={selectedCranes.length}>
				{selectedCranes.map((crane) => (
					<div key={crane}>
						<h3>{crane}번 장비</h3>
						<DataList header={cols} />
						<DataContentOl $count={cols.length}>
							{workListByAtc
								.filter((item) => item.crane === crane)
								.map((item, idx) => (
									<li key={item.container + idx}>
										<span>{item.container}</span>
										<span>{workCodeKo[item.workCode]}</span>
										<span>
											{`${item.block}-${item.bay1
												.toString()
												.padStart(2, "0")}-${item.row1
												.toString()
												.padStart(2, "0")}-${item.tier1
												.toString()
												.padStart(2, "0")}`}
										</span>
										<span>
											{`${item.block}-${item.bay2
												.toString()
												.padStart(2, "0")}-${item.row2
												.toString()
												.padStart(2, "0")}-${item.tier2
												.toString()
												.padStart(2, "0")}`}
										</span>
										<span>
											{item.timeEnd.toLocaleDateString()}
											<br />
											{item.timeEnd.toLocaleTimeString()}
										</span>
									</li>
								))}
						</DataContentOl>
					</div>
				))}
			</WorkByATCContainer>
		</SectionContainer>
	);
};

export default ATCWork;
