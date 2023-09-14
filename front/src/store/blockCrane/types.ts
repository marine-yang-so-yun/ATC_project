import { Action } from "@reduxjs/toolkit";

export type State = {
	block: string;
	crane: string[];
};

export type SetBlockCraneAction = Action<"@blockCrane/setBlockCrane"> & {
	payload: State["block"];
};

export type Actions = SetBlockCraneAction;
