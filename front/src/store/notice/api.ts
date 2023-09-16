import apiService from "api";
import type * as T from "./types";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { setNotice } from "./actions";

export const getNoticeAsync =
	(): ThunkAction<void, T.State, unknown, T.SetNoticeAction> =>
	async (dispatch: ThunkDispatch<T.State, unknown, T.SetNoticeAction>) => {
		try {
			let { data } = await apiService.noticeService.getNotice();
			data = data
				.map((notice) => ({
					...notice,
					noticedate: new Date(notice.noticedate),
				}))
				.sort((a, b) => {
					if (a.noticeurgency === b.noticeurgency) return -1;
					else if (!a.noticeurgency) return 1;
					else return -1;
				});
			dispatch(setNotice(data));
		} catch (error) {
			console.log(error);
		}
	};
