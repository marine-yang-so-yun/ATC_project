import { Action } from "@reduxjs/toolkit";

export type State = {
	block: "7A" | "7B" | "7C" | "7D" | "8A" | "8B" | "8C" | "8D";
	crane: string[];
};

export type SetBlockAction = Action<"@block/setBlock"> & {
	payload: State["block"];
};

export type Actions = SetBlockAction;
