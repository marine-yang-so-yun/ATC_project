import axios, { AxiosInstance } from "axios";
import noticeService from "./noticeService";
import loginService from "./loginService";

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

const apiService = { noticeService, loginService };

export default apiService;
