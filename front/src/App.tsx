import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/global-style";
import Header from "components/Header";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
		</ThemeProvider>
	);
}

export default App;
