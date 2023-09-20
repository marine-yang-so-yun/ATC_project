import { SetURLSearchParams } from "react-router-dom";
import { ContainerPosition, CranePosition } from "./simulator";
import Block from "components/home/simulator/Block";

export interface DataListProps {
	header: string[];
}

export interface PaginationProps {
	cate?: string;
	page: number;
	numPage: number;
	setSearchParams: SetURLSearchParams;
}

export interface SocketAnimationProps {
	cranes: React.MutableRefObject<CranePosition>;
	maxBlockList: React.MutableRefObject<{
		[block: string]: {
			position: Block;
			width: number;
			height: number;
		};
	}>;
	containers: React.MutableRefObject<ContainerPosition[]>;
	setCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface SelectDatetimeProps {
	inputs: { start: string; end: string };
	setInputs: React.Dispatch<
		React.SetStateAction<{
			start: string;
			end: string;
		}>
	>;
}
