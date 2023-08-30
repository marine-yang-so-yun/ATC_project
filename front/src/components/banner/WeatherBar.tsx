import React from "react";
import {
	BannerBarContainer,
	BannerBarLink,
} from "styles/components/banner/banner";

const WeatherBar = () => {
	return (
		<BannerBarContainer>
			<BannerBarLink to="/weather">날씨정보</BannerBarLink>
		</BannerBarContainer>
	);
};

export default WeatherBar;
