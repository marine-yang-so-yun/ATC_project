import type * as T from "./types";

export const openModal = (): T.OpenModalAction => ({
	type: "@modal/openModal",
});

export const closeModal = (): T.CloseModalAction => ({
	type: "@modal/closeModal",
});
