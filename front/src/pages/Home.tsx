import React from "react";
import ATCWork from "components/home/ATCWork";
import YardWork from "components/home/YardWork";
import Monitoring from "components/home/Monitoring";

const Home = () => {
	return (
		<>
			<Monitoring />
			<ATCWork />
			<YardWork />
		</>
	);
};

export default Home;
