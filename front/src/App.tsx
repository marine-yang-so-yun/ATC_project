import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/global-style";
import { Routes, Route } from "react-router-dom";
import Layout from "components/Layout/Layout";
import Home from "pages/Home";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
