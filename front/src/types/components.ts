import { SetURLSearchParams } from "react-router-dom";

export interface DataListProps {
	header: string[];
}

export interface PaginationProps {
	cate: string;
	page: number;
	numPage: number | undefined;
	setSearchParams: SetURLSearchParams;
}
