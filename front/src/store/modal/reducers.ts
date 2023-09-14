import * as T from "./types";

const initialState: T.State = {
	isOpen: false,
};

export const reducer = (state: T.State = initialState, action: T.Actions) => {
	switch (action.type) {
		case "@modal/openModal":
			return { isOpen: true };
		case "@modal/closeModal":
			return { isOpen: false };
	}
	return state;
};
