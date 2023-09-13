import React from "react";
import * as S from "styles/components/notice/pagination";
import { PaginationProps } from "types/components";

const Pagination = ({
	cate,
	page,
	numPage,
	setSearchParams,
}: PaginationProps) => {
	return (
		<S.PaginationContainer>
			<button
				onClick={() => setSearchParams({ cate, page: (page - 1).toString() })}
				disabled={page === 1}
			>
				이전
			</button>
			{Array(numPage)
				.fill(null)
				.map((_, i) => (
					<button
						key={i}
						onClick={() => setSearchParams({ cate, page: (i + 1).toString() })}
						className={page === i + 1 ? "active" : ""}
					>
						{i + 1}
					</button>
				))}
			<button
				onClick={() => setSearchParams({ cate, page: (page + 1).toString() })}
				disabled={page === numPage}
			>
				다음
			</button>
		</S.PaginationContainer>
	);
};

export default Pagination;
