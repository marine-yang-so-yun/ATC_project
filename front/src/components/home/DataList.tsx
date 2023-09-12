import React from "react";
import * as S from "styles/components/home/dataList.style";
import { DataListProps } from "types/components";

const DataList = ({ header }: DataListProps) => {
	return (
		<div>
			<S.DataListHeaderOl $count={header.length}>
				<li>
					{header.map((col) => (
						<span key={col}>{col}</span>
					))}
				</li>
			</S.DataListHeaderOl>
		</div>
	);
};

export default DataList;
