import { axiosInstance } from "api";
import { LoginData } from "types/api";

/**
 * 로그인 요청
 * @param body 로그인하는데 필요한 데이터들(username, password)
 * @return AxiosPromise
 */
const login = (body: LoginData) => axiosInstance.post("/login", body);

const loginService = { login };

export default loginService;
