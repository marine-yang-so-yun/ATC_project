import * as Notice from "./notice";
import * as BlockCrane from "./blockCrane";
import * as Modal from "./modal";

export type AppState = {
	notices: Notice.State;
	blockCrane: BlockCrane.State;
	modal: Modal.State;
};
