import React, { useEffect, useState } from "react";
import DataList from "components/DataList";
import { DataContentOl } from "styles/components/dataList.style";
import {
	CateBtn,
	NoticeTitle,
	TitleContainer,
} from "styles/page/notice/noticeList.style";
import { useSearchParams } from "react-router-dom";
import { ContainerWorkData } from "types/api";
import apiService from "api";
import Pagination from "components/Pagination";
import { SectionContainer } from "styles/commons";

const ATCWorkList = () => {
	const [ATCWorkList, setATCWorkList] = useState<ContainerWorkData[]>([]);
	const ATCNum = ["251", "252", "253", "254", "255", "256", "257", "258"];
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedATCNum = searchParams.get("cate") || "251";
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
			let { data } = await apiService.containerService.getAllWorkListByATC(
				selectedATCNum
			);
			data = data.map((item) => ({ ...item, timeEnd: new Date(item.timeEnd) }));
			setATCWorkList(data);
			setNumPage(Math.ceil(data.length / 20));
		};
		fetchATCWorkList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedATCNum]);

	if (ATCWorkList.length === 0) return null;

	return (
		<>
			<TitleContainer>
				<NoticeTitle>ATC 작업 목록</NoticeTitle>
				<div>
					{ATCNum.map((atc) => (
						<CateBtn
							key={atc}
							$active={selectedATCNum === atc}
							onClick={() => setSearchParams({ cate: atc })}
						>
							{atc}
						</CateBtn>
					))}
				</div>
			</TitleContainer>
			<SectionContainer>
				<DataList header={cols} />
				<DataContentOl $count={cols.length}>
					{ATCWorkList.slice(offset, offset + 20).map((item, idx) => (
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
