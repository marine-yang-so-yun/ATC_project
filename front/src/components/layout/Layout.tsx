import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Banner from "components/banner/Banner";

const Layout = () => {
	const loc = useLocation().pathname;

	return (
		<>
			<Header />
			{loc === "/" && <Banner />}
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Layout;
