import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/global-style";
import { Routes, Route } from "react-router-dom";
import Layout from "components/layout/Layout";
import Home from "pages/Home";
import NoticeList from "pages/notice/NoticeList";
import NoticeDetail from "pages/notice/NoticeDetail";
import { useStore } from "store";

function App() {
	const store = useStore();

	return (
		<ReduxProvider store={store}>
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
		</ReduxProvider>
	);
}

export default App;
