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

export interface CurrentContainerWorkData {
	container: "string";
	timeEnd: "string";
	bay: number;
	row: number;
	tier: number;
}

export interface ContainerWorkData {
	id: number;
	container: string;
	workCode: string;
	state: string;
	shipVoyage: string;
	ship: string;
	year: number;
	voyage: number;
	block1: string;
	bay1: number;
	row1: number;
	tier1: number;
	bayRowTier1: string;
	block2: string;
	bay2: number;
	row2: number;
	tier2: number;
	bayRowTier2: string;
	truckNum: string;
	fullOrEmpty: string;
	containerSize: string;
	crainNum: string;
	workingStart: string;
	timeStart: Date;
	workingEnd: string;
	timeEnd: Date;
	timeTaken: string;
	block1CrainNum: string;
}
