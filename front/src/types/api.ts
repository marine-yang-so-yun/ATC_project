export interface LoginData {
	username: string;
	password: string;
}

export interface NoticeData {
	noticeseq: number;
	noticetitle: string;
	noticewriter: string;
	noticedate: Date;
	noticeurgency: boolean;
	noticedetail: string;
}

export interface ContainerWorkData {
	container: string;
	ship: string;
	workCode: string;
	voyage: number;
	block1: string;
	bay1: number;
	row1: number;
	tier1: number;
	block2: string;
	bay2: number;
	row2: number;
	tier2: number;
	truckNum: string;
	fullOrEmpty: string;
	containerSize: string;
	crane: string;
	timeEnd: Date;
}

export type CurrentContainerWorkData = Pick<
	ContainerWorkData,
	"container" | "block2" | "bay2" | "row2" | "tier2" | "timeEnd"
>;

export type CurrentWorkByCrane = Pick<
	ContainerWorkData,
	"crane" | "block2" | "bay2" | "row2" | "tier2" | "timeEnd"
>;

export type CurrentATCWorkData = Omit<CurrentContainerWorkData, "container">;

export interface WorkingCraneData {
	craneseq: number;
	crane: string;
}

export type SocketContainerData = Omit<
	ContainerWorkData,
	| "container"
	| "ship"
	| "voyage"
	| "truckNum"
	| "fullOrEmpty"
	| "containerSize"
	| "timeEnd"
>;

export type SocketContainerByATCData = Omit<
	ContainerWorkData,
	"ship" | "voyage" | "truckNum" | "fullOrEmpty" | "containerSize"
>;

export type SocketYardData = Pick<
	ContainerWorkData,
	| "container"
	| "ship"
	| "voyage"
	| "block1"
	| "bay1"
	| "row1"
	| "tier1"
	| "timeEnd"
	| "workCode"
>;

export interface MaxBlockData {
	block: string;
	maxbay: number;
	maxrow: number;
	maxtier: number;
}
