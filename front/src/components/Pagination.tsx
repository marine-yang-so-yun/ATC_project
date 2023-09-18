import React, { useState } from "react";
import * as S from "styles/components/pagination";
import { PaginationProps } from "types/components";
import {
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
	AiOutlineRight,
	AiOutlineLeft,
} from "react-icons/ai";

const Pagination = ({
	cate,
	page,
	numPage,
	setSearchParams,
}: PaginationProps) => {
	const [offset, setOffset] = useState<number>(0);

	const handlePageClick = (newPage: number) => {
		const newOffset = Math.floor((newPage - 1) / 10);
		setOffset(newOffset);
		cate
			? setSearchParams({ cate, page: newPage.toString() })
			: setSearchParams({ page: newPage.toString() });
	};

	return (
		<S.PaginationContainer>
			<button onClick={() => handlePageClick(1)} disabled={page < 10}>
				<AiOutlineDoubleLeft />
			</button>
			<button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
				<AiOutlineLeft />
			</button>
			{Array(10)
				.fill(null)
				.map((_, i) => {
					const pageNum = offset * 10 + i + 1;
					if (pageNum > numPage) return null;
					return (
						<button
							key={i}
							onClick={() => handlePageClick(pageNum)}
							className={page === pageNum ? "active" : ""}
						>
							{pageNum}
						</button>
					);
				})}
			<button
				onClick={() => handlePageClick(page + 1)}
				disabled={page === numPage}
			>
				<AiOutlineRight />
			</button>
			<button
				onClick={() => handlePageClick(numPage)}
				disabled={page > numPage - 10}
			>
				<AiOutlineDoubleRight />
			</button>
		</S.PaginationContainer>
	);
};

export default Pagination;
