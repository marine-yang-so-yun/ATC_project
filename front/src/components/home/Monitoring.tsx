import React from "react";
import { MainTitle } from "styles/commons";
import Simulator from "./simulator/Simulator";

const Monitoring = () => {
	return (
		<section>
			<MainTitle>실시간 작업 모니터링</MainTitle>
			<Simulator />
		</section>
	);
};

export default Monitoring;
