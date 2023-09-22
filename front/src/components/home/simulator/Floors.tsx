import React from "react";
import * as THREE from "three";
import { MaxBlockList } from "types/simulator";

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

const Floors = ({
	maxBlockList,
}: {
	maxBlockList: React.MutableRefObject<MaxBlockList>;
}) => {
	if (Object.values(maxBlockList.current).length === 0) return null;

	return (
		<>
			{Object.values(maxBlockList.current).map(
				({ position, width, height }, idx) => (
					<Floor
						key={idx}
						position={
							new THREE.Vector3(
								position.x + width - 3,
								0,
								position.z + height / 2
							)
						}
						width={width * 2 + 5}
						height={height + 8}
					/>
				)
			)}
		</>
	);
};

export default Floors;
