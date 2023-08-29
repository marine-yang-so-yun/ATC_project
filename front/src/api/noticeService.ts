import { axiosInstance } from "api";
import { NoticeData } from "types/api";

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
	axiosInstance.post("/notice/createNotice", body);

const noticeService = { getNotice, postNotice };

export default noticeService;
