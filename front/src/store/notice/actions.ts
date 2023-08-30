import type * as T from "./types";

export const setNotice = (payload: T.State): T.SetNoticeAction => ({
	type: "@notice/setNotice",
	payload,
});
