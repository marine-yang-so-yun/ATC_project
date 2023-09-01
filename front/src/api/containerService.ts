import { axiosInstance } from "api";
import { CurrentContainerWorkData } from "types/api";

/**
 * 현재까지 작업 완료된 컨테이너 좌표 리스트 요청
 * @return AxiosPromise
 */
const getCurrentContainerWork = () =>
	axiosInstance.get<CurrentContainerWorkData[]>("/containerwork/current");

const containerService = { getCurrentContainerWork };

export default containerService;
