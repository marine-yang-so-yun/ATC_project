import React, { Suspense } from "react";
import ATCWork from "components/home/ATCWork";
import YardWork from "components/home/YardWork";
import { MainTitle } from "styles/commons";
import Simulator from "components/home/simulator/Simulator";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { openModal } from "store/modal";
import * as S from "styles/page/home.style";
import { ThreeCanvas } from "styles/components/home/simulator.style";
import { Html } from "@react-three/drei";

const Home = () => {
	const selectedBlock: AppState["blockCrane"]["block"] = useSelector(
		(state: AppState) => state.blockCrane.block
	);
	const dispatch = useDispatch();

	return (
		<>
			<S.MainSectionContainer>
				<MainTitle>실시간 작업 모니터링</MainTitle>
				<div>
					<span>야드 블록 번호</span>
					<button onClick={() => dispatch(openModal())}>{selectedBlock}</button>
				</div>
			</S.MainSectionContainer>
			<ThreeCanvas shadows>
				<Simulator />
			</ThreeCanvas>
			{selectedBlock !== "전체" && <ATCWork />}
			<YardWork />
		</>
	);
};

export default Home;
