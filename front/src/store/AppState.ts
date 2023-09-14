import * as Notice from "./notice";
import * as BlockCrane from "./blockCrane";

export type AppState = {
	notices: Notice.State;
	blockCrane: BlockCrane.State;
};
