import apiService from "api";
import DataList from "components/DataList";
import Pagination from "components/Pagination";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	SectionContainer,
	SubPageTitle,
	SubPageTitleContainer,
} from "styles/commons";
import { DataContentOl } from "styles/components/dataList.style";
import { ContainerWorkData } from "types/api";

const YardWorkList = () => {
	const [yardWorkList, setYardWorkList] = useState<ContainerWorkData[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const page: number = Number(searchParams.get("page")) || 1;
	const [numPage, setNumPage] = useState<number>(1);
	const offset = (page - 1) * 20;

	const cols = [
		"컨테이너번호",
		"작업코드",
		"모선항차",
		"출발위치",
		"도착위치",
		"작업완료시간",
		"Full/Empty",
		"컨테이너 크기",
		"ATC",
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
		const fetchYardWorkList = async () => {
			let { data } = await apiService.containerService.getAllWorkList();
			data = data.map((item) => ({ ...item, timeEnd: new Date(item.timeEnd) }));
			setYardWorkList(data);
		};
		fetchYardWorkList();
	}, []);

	useEffect(() => {
		setNumPage(Math.ceil(yardWorkList.length / 20));
	}, [yardWorkList.length]);

	if (yardWorkList.length === 0) return null;

	return (
		<>
			<SubPageTitleContainer>
				<SubPageTitle>야드 작업 목록</SubPageTitle>
			</SubPageTitleContainer>
			<SectionContainer>
				<DataList header={cols} />
				<DataContentOl $count={cols.length}>
					{yardWorkList.slice(offset, offset + 20).map((item, idx) => (
						<li key={item.container + idx}>
							<span>{item.container}</span>
							<span>{workCodeKo[item.workCode]}</span>
							<span>{item.ship + item.voyage}</span>
							<span>
								{`${item.block}-${item.bay1
									.toString()
									.padStart(2, "0")}-${item.row1
									.toString()
									.padStart(2, "0")}-${item.tier1.toString().padStart(2, "0")}`}
							</span>
							<span>
								{`${item.block}-${item.bay2
									.toString()
									.padStart(2, "0")}-${item.row2
									.toString()
									.padStart(2, "0")}-${item.tier2.toString().padStart(2, "0")}`}
							</span>
							<span>
								{item.timeEnd.toLocaleDateString()}
								<br />
								{item.timeEnd.toLocaleTimeString()}
							</span>
							<span>{item.fullOrEmpty}</span>
							<span>{item.containerSize}</span>
							<span>{item.crane}</span>
						</li>
					))}
				</DataContentOl>
				<Pagination
					page={page}
					numPage={numPage}
					setSearchParams={setSearchParams}
				/>
			</SectionContainer>
		</>
	);
};

export default YardWorkList;
