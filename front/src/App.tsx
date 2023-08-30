import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/global-style";
import { Routes, Route } from "react-router-dom";
import Layout from "components/layout/Layout";
import Home from "pages/Home";
import NoticeList from "pages/notice/NoticeList";
import NoticeDetail from "pages/notice/NoticeDetail";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/notice" element={<NoticeList />} />
					<Route path="/notice/:seq" element={<NoticeDetail />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
