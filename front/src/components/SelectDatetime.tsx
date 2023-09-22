import React from "react";
import { SelectDatetimeProps } from "types/components";

const SelectDatetime = ({ inputs, setInputs }: SelectDatetimeProps) => {
	return (
		<div>
			<input
				type="datetime-local"
				value={inputs.start}
				onChange={(e) => setInputs({ ...inputs, start: e.target.value })}
			/>
			<span>~</span>
			<input
				type="datetime-local"
				value={inputs.end}
				onChange={(e) => setInputs({ ...inputs, end: e.target.value })}
			/>
		</div>
	);
};

export default SelectDatetime;
