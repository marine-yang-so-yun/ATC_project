import React from "react";
import * as S from "styles/components/banner/banner.style";

const WeatherBar = () => {
	return (
		<S.BannerBarContainer>
			<S.BannerBarLink to="/weather">날씨정보</S.BannerBarLink>
		</S.BannerBarContainer>
	);
};

export default WeatherBar;
