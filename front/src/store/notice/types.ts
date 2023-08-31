import { Action } from "@reduxjs/toolkit";
import { NoticeData } from "types/api";

export type State = NoticeData[];

export type SetNoticeAction = Action<"@notice/setNotice"> & { payload: State };

export type Actions = SetNoticeAction;
