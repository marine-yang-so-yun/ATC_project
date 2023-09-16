import { axiosInstance } from "api";
import {
	ContainerWorkData,
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
 * 블록별 bay, row, tier의 max값 리스트 요청
 * @return AxiosPromise
 */
const getMaxBlock = () =>
	axiosInstance.get<MaxBlockData[]>("/maxblock/findall");

/**
 * 현재까지 작업 완료된 크레인별 좌표 리스트 요청
 * @return AxiosPromise
 */
const getCurrentWorkByCrane = () =>
	axiosInstance.get<CurrentATCWorkData[]>(
		"/containerwork/findLastTimeWorkByCrane"
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

/**
 * 현재 시간 이후 작업 리스트 요청
 * @return AxiosPromise
 */
const getWorkList = () =>
	axiosInstance.get<ContainerWorkData[]>("/containerwork/findWorkList");

/**
 * 야드 전체 작업 리스트 요청
 * @return AxiosPromise
 */
const getAllWorkList = () =>
	axiosInstance.get<ContainerWorkData[]>("/containerwork/allWorkList");

/**
 * ATC별 전체 작업 리스트 요청
 * @param crane
 * @return AxiosPromise
 */
const getAllWorkListByATC = (crane: string) =>
	axiosInstance.get<ContainerWorkData[]>(`/containerwork/allWorkList/${crane}`);

const containerService = {
	getCurrentContainerWork,
	getMaxBlock,
	getCurrentWorkByCrane,
	getATCNum,
	getWorkList,
	getAllWorkList,
	getAllWorkListByATC,
};

export default containerService;
