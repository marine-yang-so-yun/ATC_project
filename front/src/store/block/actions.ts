import type * as T from "./types";

export const setBlock = (payload: T.State["block"]): T.SetBlockAction => ({
	type: "@block/setBlock",
	payload,
});
