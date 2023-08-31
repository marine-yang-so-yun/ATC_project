import React from "react";
import NoticeBar from "./NoticeBar";
import WeatherBar from "./WeatherBar";
import * as S from "styles/components/banner/banner.style";

const Banner = () => {
	return (
		<S.BannerContainer>
			<NoticeBar />
			<WeatherBar />
		</S.BannerContainer>
	);
};

export default Banner;
