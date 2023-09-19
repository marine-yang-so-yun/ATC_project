import * as T from "./types";

const initialState: T.State = { block: "전체", crane: [] };

export const reducer = (state: T.State = initialState, action: T.Actions) => {
	const craneByBlock: Record<string, string[]> = {
		"7A": ["251"],
		"7B": ["252"],
		"7C": ["253"],
		"7D": ["254", "258"],
		"8A": ["255"],
		"8B": ["256"],
		"8C": ["257"],
		"8D": ["254", "258"],
	};

	switch (action.type) {
		case "@blockCrane/setBlockCrane":
			const crane = craneByBlock[action.payload];
			return { block: action.payload, crane };
	}
	return state;
};
