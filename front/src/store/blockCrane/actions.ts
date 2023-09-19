import type * as T from "./types";

export const setBlockCrane = (
	payload: T.State["block"]
): T.SetBlockCraneAction => ({
	type: "@blockCrane/setBlockCrane",
	payload,
});
