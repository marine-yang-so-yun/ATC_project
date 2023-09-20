import React, { useEffect, useState } from "react";
import apiService from "api";
import DataList from "components/DataList";
import Pagination from "components/Pagination";
import { useSearchParams } from "react-router-dom";
import {
	CSVDownloadBtn,
	SectionContainer,
	SubPageTitle,
	SubPageTitleContainer,
} from "styles/commons";
import { DataContentOl } from "styles/components/dataList.style";
import { ContainerWorkCSVData } from "types/subpage";

const YardWorkList = () => {
	const [yardWorkList, setYardWorkList] = useState<ContainerWorkCSVData[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const page: number = Number(searchParams.get("page")) || 1;
	const [numPage, setNumPage] = useState<number>(1);
	const offset = (page - 1) * 20;
	const [inputs, setInputs] = useState<{ start: string; end: string }>({
		start: "2023-04-06T00:00",
		end: "2023-04-06T23:59",
	});

	const headers = [
		{ label: "컨테이너번호", key: "container" },
		{ label: "작업코드", key: "workCode" },
		{ label: "모선항차", key: "shipVoyage" },
		{ label: "출발위치", key: "fromPosition" },
		{ label: "도착위치", key: "toPosition" },
		{ label: "작업완료시간", key: "timeEnd" },
		{ label: "Full/Empty", key: "fullOrEmpty" },
		{ label: "컨테이너 크기", key: "containerSize" },
		{ label: "ATC", key: "crane" },
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
			const { data } = await apiService.containerService.getAllWorkList();
			const csvData = data.map((item) => ({
				container: item.container,
				workCode: item.workCode,
				shipVoyage: item.ship + item.voyage,
				fromPosition: `${item.block1}-${item.bay1
					.toString()
					.padStart(2, "0")}-${item.row1
					.toString()
					.padStart(2, "0")}-${item.tier1.toString().padStart(2, "0")}`,
				toPosition: `${item.block2}-${item.bay2
					.toString()
					.padStart(2, "0")}-${item.row2
					.toString()
					.padStart(2, "0")}-${item.tier2.toString().padStart(2, "0")}`,
				timeEnd: new Date(item.timeEnd),
				fullOrEmpty: item.fullOrEmpty,
				containerSize: item.containerSize,
				crane: item.crane,
			}));
			setYardWorkList(csvData);
		};
		fetchYardWorkList();
	}, []);

	useEffect(() => {
		setNumPage(
			Math.ceil(
				yardWorkList.filter(
					(data) =>
						data.timeEnd >= new Date(inputs.start) &&
						data.timeEnd <= new Date(inputs.end)
				).length / 20
			)
		);
	}, [inputs.end, inputs.start, yardWorkList]);

	if (yardWorkList.length === 0) return null;

	return (
		<>
			<SubPageTitleContainer>
				<SubPageTitle>야드 작업 목록</SubPageTitle>
			</SubPageTitleContainer>
			<SectionContainer>
				<div>
					<input
						type="datetime-local"
						value={inputs.start}
						onChange={(e) => setInputs({ ...inputs, start: e.target.value })}
					/>
					<span>~</span>
					<input
						type="datetime-local"
						value={inputs.end}
						onChange={(e) => setInputs({ ...inputs, end: e.target.value })}
					/>
				</div>
				<CSVDownloadBtn
					data={yardWorkList.filter(
						(data) =>
							data.timeEnd >= new Date(inputs.start) &&
							data.timeEnd <= new Date(inputs.end)
					)}
					headers={headers}
					filename="야드작업목록.csv"
					target="_blank"
				>
					야드 작업 목록 csv 다운로드
				</CSVDownloadBtn>
				<DataList header={headers.map((header) => header.label)} />
				<DataContentOl $count={headers.map((header) => header.label).length}>
					{yardWorkList
						.filter(
							(data) =>
								data.timeEnd >= new Date(inputs.start) &&
								data.timeEnd <= new Date(inputs.end)
						)
						.slice(offset, offset + 20)
						.map((item, idx) => (
							<li key={item.container + idx}>
								<span>{item.container}</span>
								<span>{workCodeKo[item.workCode]}</span>
								<span>{item.shipVoyage}</span>
								<span>{item.fromPosition}</span>
								<span>{item.toPosition}</span>
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
