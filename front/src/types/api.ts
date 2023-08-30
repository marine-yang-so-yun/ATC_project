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
	bay1: string;
	bay2: string;
	bay_row_tier1: string;
	bay_row_tier2: string;
	block1: string;
	block1crain_num: string;
	block2: string;
	container: string;
	container_size: string;
	crain_num: string;
	elapsed_minutes: number;
	elapsed_seconds: number;
	full_or_empty: string;
	row1: string;
	row2: string;
	ship: string;
	ship_voyage: string;
	tier1: string;
	tier2: string;
	truck_num: number;
	voyage: number;
	work_code: string;
	working_end: string;
	working_start: string;
	year: number;
}
