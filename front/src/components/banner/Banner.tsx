import React from "react";
import NoticeBar from "./NoticeBar";
import WeatherBar from "./WeatherBar";
import { BannerContainer } from "styles/components/banner/banner";

const Banner = () => {
	return (
		<BannerContainer>
			<NoticeBar />
			<WeatherBar />
		</BannerContainer>
	);
};

export default Banner;
