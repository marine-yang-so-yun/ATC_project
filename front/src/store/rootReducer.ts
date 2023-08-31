import { combineReducers } from "@reduxjs/toolkit";
import * as Notice from "./notice";

export const rootReducer = combineReducers({
	notices: Notice.reducer,
});
