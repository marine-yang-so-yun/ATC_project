import { combineReducers } from "@reduxjs/toolkit";
import * as Notice from "./notice";
import * as Block from "./block";

export const rootReducer = combineReducers({
	notices: Notice.reducer,
	block: Block.reducer,
});
