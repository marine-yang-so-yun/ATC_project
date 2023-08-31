import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useMemo } from "react";
import thunk from "redux-thunk";

const initializeStore = () => {
	const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
	return store;
};

export function useStore() {
	const store = useMemo(() => initializeStore(), []);
	return store;
}
