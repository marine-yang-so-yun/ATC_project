import { axiosInstance } from "api";
import {
	CurrentATCWorkData,
	CurrentContainerWorkData,
	MaxBlockData,
	WorkingCraneData,
} from "types/api";

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

/**
 * 현재까지 작업 완료된 블록별 좌표 리스트 요청
 * @return AxiosPromise
 */
const getCurrentWorkByBlock = () =>
	axiosInstance.get<CurrentATCWorkData[]>(
		"/containerwork/findLastTimeWorkByBlock"
	);

/**
 * 해당 블록에서 일하는 ATC 번호 요청
 * @param block
 * @return AxiosPromise
 */
const getATCNum = (block: string) =>
	axiosInstance.get<WorkingCraneData[]>(
		`/containerwork/findworkingcrane/${block}`
	);

const containerService = {
	getCurrentContainerWork,
	getMaxBlock,
	getCurrentWorkByBlock,
	getATCNum,
};

export default containerService;
