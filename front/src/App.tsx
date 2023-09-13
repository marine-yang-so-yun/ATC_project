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
import WriteNotice from "pages/notice/WriteNotice";

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
						<Route path="/createnotice" element={<WriteNotice />} />
						<Route path="editnotice" element={<WriteNotice />} />
					</Route>
					<Route path="/login" element={<Login />} />
				</Routes>
			</ThemeProvider>
		</ReduxProvider>
	);
}

export default App;
