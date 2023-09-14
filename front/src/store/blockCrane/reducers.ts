import * as T from "./types";
import craneByBlock from "utils/craneByBlock";

const initialState: T.State = { block: "7A", crane: ["251"] };

export const reducer = (state: T.State = initialState, action: T.Actions) => {
	switch (action.type) {
		case "@blockCrane/setBlockCrane":
			const crane = craneByBlock[action.payload];
			return { block: action.payload, crane };
	}
	return state;
};
