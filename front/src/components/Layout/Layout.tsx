import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { MainContainer } from "styles/commons";
import Banner from "components/banner/Banner";

const Layout = () => {
	const loc = useLocation().pathname;

	return (
		<>
			<Header />
			{loc === "/" && <Banner />}
			<MainContainer>
				<Outlet />
			</MainContainer>
			<Footer />
		</>
	);
};

export default Layout;
