import * as Notice from "./notice";
import * as Block from "./block";

export type AppState = {
	notices: Notice.State;
	block: Block.State;
};
