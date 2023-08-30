import apiService from "api";
import type * as T from "./types";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { setNotice } from "./actions";

export const getNoticeAsync =
	(): ThunkAction<void, T.State, unknown, T.SetNoticeAction> =>
	async (dispatch: ThunkDispatch<T.State, unknown, T.SetNoticeAction>) => {
		try {
			let { data } = await apiService.noticeService.getNotice();
			data = data.map((notice) => ({
				...notice,
				noticedate: new Date(notice.noticedate),
			}));
			dispatch(setNotice(data));
		} catch (error) {
			console.log(error);
		}
	};
