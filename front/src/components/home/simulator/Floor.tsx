import React from "react";
import { angleToRadians } from "./angleToRadians";

const Floor = () => {
	return (
		<mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
			<planeGeometry args={[200, 120]} />
			<meshStandardMaterial color="lightGreen" />
		</mesh>
	);
};

export default Floor;
