import { axiosInstance } from "api";
import { NoticeData } from "types/api";
import { getCookie } from "utils/cookieUtils";

/**
 * 공지사항 전체 리스트 요청
 * @return AxiosPromise
 */
const getNotice = () => axiosInstance.get<NoticeData[]>("/notice");

/**
 * 공지사항 작성
 * @param body 공지사항 작성하는데 필요한 데이터들(title, writer, urgency, detail)
 * @return AxiosPromise
 */
const postNotice = (body: Omit<NoticeData, "noticeseq" | "noticedate">) =>
	axiosInstance.post("/notice/createNotice", body, {
		headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
	});

/**
 * 공지사항 수정
 * @param body 공지사항 수정하는데 필요한 데이터들(seq, title, writer, urgency, detail)
 * @return AxiosPromise
 */
const putNotice = (body: Omit<NoticeData, "noticedate">) =>
	axiosInstance.put("/notice/updateNotice", body, {
		headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
	});

/**
 * 공지사항 삭제
 * @param seq 공지사항의 seq
 * @return AxiosPromise
 */
const deleteNotice = (seq: number) =>
	axiosInstance.delete(`/notice/deleteNotice`, {
		params: { seq },
		headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
	});

const noticeService = { getNotice, postNotice, putNotice, deleteNotice };

export default noticeService;
