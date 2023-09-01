import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "store";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/global-style";
import { Routes, Route } from "react-router-dom";
import Layout from "components/layout/Layout";
import Home from "pages/Home";
import NoticeList from "pages/notice/NoticeList";
import Login from "pages/Login";
import CreateNotice from "pages/notice/CreateNotice";

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
						<Route path="/createnotice" element={<CreateNotice />} />
						<Route path="/login" element={<Login />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</ReduxProvider>
	);
}

export default App;
