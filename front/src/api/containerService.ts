import { axiosInstance } from "api";
import { CurrentContainerWorkData, MaxBlockData } from "types/api";

/**
 * 현재까지 작업 완료된 컨테이너 좌표 리스트 요청
 * @return AxiosPromise
 */
const getCurrentContainerWork = () =>
	axiosInstance.get<CurrentContainerWorkData[]>("/containerwork/current");

/**
 * 블록의 bay, row, tier의 max값 리스트 요청
 * @return AxiosPromise
 */
const getMaxBlock = () =>
	axiosInstance.get<MaxBlockData[]>("/maxblock/findall");

const containerService = { getCurrentContainerWork, getMaxBlock };

export default containerService;
