import axios, { AxiosInstance } from "axios";
import noticeService from "./noticeService";
import loginService from "./loginService";
import containerService from "./containerService";

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

const apiService = { noticeService, loginService, containerService };

export default apiService;
