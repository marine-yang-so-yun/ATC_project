import React, { useEffect, useState } from "react";
import DataList from "components/DataList";
import { DataContentOl } from "styles/components/dataList.style";
import { useSearchParams } from "react-router-dom";
import apiService from "api";
import Pagination from "components/Pagination";
import {
	CSVDownloadBtn,
	SectionContainer,
	SubPageTitle,
	SubPageTitleContainer,
	SubpageCateBtn,
} from "styles/commons";
import { ContainerWorkCSVData } from "types/subpage";

const ATCWorkList = () => {
	const [ATCWorkList, setATCWorkList] = useState<ContainerWorkCSVData[]>([]);
	const ATCNum = ["251", "252", "253", "254", "255", "256", "257", "258"];
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedATCNum = searchParams.get("cate") || "251";
	const page: number = Number(searchParams.get("page")) || 1;
	const [numPage, setNumPage] = useState<number>(1);
	const offset = (page - 1) * 20;

	const headers = [
		{ label: "컨테이너번호", key: "container" },
		{ label: "작업코드", key: "workCode" },
		{ label: "모선항차", key: "shipVoyage" },
		{ label: "출발위치", key: "fromPosition" },
		{ label: "도착위치", key: "toPosition" },
		{ label: "작업완료시간", key: "timeEnd" },
		{ label: "Full/Empty", key: "fullOrEmpty" },
		{ label: "컨테이너 크기", key: "containerSize" },
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
		if (!selectedATCNum || ATCNum.indexOf(selectedATCNum) === -1) return;

		const fetchATCWorkList = async () => {
			const { data } = await apiService.containerService.getAllWorkListByATC(
				selectedATCNum
			);
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
			setATCWorkList(csvData);
			setNumPage(Math.ceil(csvData.length / 20));
		};
		fetchATCWorkList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedATCNum]);

	const options = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	if (ATCWorkList.length === 0) return null;

	return (
		<>
			<SubPageTitleContainer>
				<SubPageTitle>ATC 작업 목록</SubPageTitle>
				<div>
					{ATCNum.map((atc) => (
						<SubpageCateBtn
							key={atc}
							$active={selectedATCNum === atc}
							onClick={() => setSearchParams({ cate: atc })}
						>
							{atc}
						</SubpageCateBtn>
					))}
				</div>
			</SubPageTitleContainer>
			<SectionContainer>
				<CSVDownloadBtn
					data={ATCWorkList.filter((data) => data.crane === selectedATCNum)}
					headers={headers}
					filename={`${selectedATCNum}작업목록.csv`}
					target="_blank"
				>
					ATC별 작업 목록 csv 다운로드
				</CSVDownloadBtn>
				<DataList header={headers.map((header) => header.label)} />
				<DataContentOl $count={headers.map((header) => header.label).length}>
					{ATCWorkList.filter((item) => item.crane === selectedATCNum)
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
							</li>
						))}
				</DataContentOl>
				<Pagination
					cate={selectedATCNum}
					page={page}
					numPage={numPage}
					setSearchParams={setSearchParams}
				/>
			</SectionContainer>
		</>
	);
};

export default ATCWorkList;
