import * as T from "./types";

const initialState: T.State = { block: "7A", crane: ["251"] };

const craneByBlock: Record<T.State["block"], T.State["crane"]> = {
	"7A": ["251"],
	"7B": ["252"],
	"7C": ["253"],
	"7D": ["254", "258"],
	"8A": ["255"],
	"8B": ["256"],
	"8C": ["257"],
	"8D": ["254", "258"],
};

export const reducer = (state: T.State = initialState, action: T.Actions) => {
	switch (action.type) {
		case "@block/setBlock":
			const crane = craneByBlock[action.payload];
			return { block: action.payload, crane };
	}
	return state;
};
