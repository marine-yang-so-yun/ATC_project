import { combineReducers } from "@reduxjs/toolkit";
import * as Notice from "./notice";
import * as BlockCrane from "./blockCrane";
import * as Modal from "./modal";

export const rootReducer = combineReducers({
	notices: Notice.reducer,
	blockCrane: BlockCrane.reducer,
	modal: Modal.reducer,
});
