import React from "react";
import { MainTitle } from "styles/commons";
import Simulator from "./simulator/Simulator";
import { SectionContainer } from "styles/commons";

const Monitoring = () => {
	return (
		<SectionContainer>
			<MainTitle>실시간 작업 모니터링</MainTitle>
			<Simulator />
		</SectionContainer>
	);
};

export default Monitoring;
