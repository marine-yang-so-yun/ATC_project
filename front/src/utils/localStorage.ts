import { getCookie, removeCookie } from "./cookieUtils";

export const getUser = () => {
	const userInfo =
		localStorage.getItem("username") && getCookie("accessToken")
			? localStorage.getItem("username")
			: null;
	return userInfo;
};

export const removeUser = () => {
	removeCookie("accessToken");
	localStorage.clear();
};
