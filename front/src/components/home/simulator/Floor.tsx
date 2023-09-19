import React from "react";
import * as THREE from "three";

const Floor = ({
	width,
	height,
	position,
}: {
	width: number;
	height: number;
	position: THREE.Vector3;
}) => {
	return (
		<mesh
			rotation={[-((Math.PI / 180) * 90), 0, 0]}
			position={position}
			receiveShadow
		>
			<planeGeometry args={[width, height]} />
			<meshStandardMaterial color="#7c9c60" />
		</mesh>
	);
};

export default Floor;
