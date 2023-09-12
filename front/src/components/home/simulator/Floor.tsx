import React from "react";
import { angleToRadians } from "./angleToRadians";

const Floor = () => {
	return (
		<mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
			<planeGeometry args={[160, 80]} />
			<meshStandardMaterial color="#a0f4a4" />
		</mesh>
	);
};

export default Floor;
