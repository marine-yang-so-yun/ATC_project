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
	id: number;
	container: string;
	ship: string;
	workCode: string;
	state: string;
	year: number;
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

export interface CurrentContainerWorkData {
	crane: string;
	container: string;
	timeEnd: string;
	block: string;
	bay: number;
	row: number;
	tier: number;
}

export type CurrentATCWorkData = Omit<CurrentContainerWorkData, "container">;

export interface SocketContainerData {
	bay1: number;
	bay2: number;
	block2: string;
	row1: number;
	row2: number;
	tier1: number;
	tier2: number;
	crane: string;
	workStatus: string;
}

export interface MaxBlockData {
	block: string;
	maxbay: number;
	maxrow: number;
	maxtier: number;
}

export interface WorkingCraneData {
	craneseq: number;
	crane: string;
}
