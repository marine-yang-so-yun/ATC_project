import React from "react";
import { CranePosition } from "types/simulator";
import { angleToRadians } from "./angleToRadians";

const ATCCranes = ({ cranes }: { cranes: CranePosition }) => {
	if (Object.keys(cranes).length === 0) return null;

	return (
		<>
			{Object.entries(cranes).map(([craneNum, position]) => (
				<group key={craneNum} position={position}>
					<mesh position={[0, 5, 0]} receiveShadow>
						<boxGeometry attach="geometry" args={[2, 10, 1]} />
						<meshStandardMaterial attach="material" color="yellow" />
					</mesh>
					<mesh position={[0, 5, -15]} receiveShadow>
						<boxGeometry attach="geometry" args={[2, 10, 1]} />
						<meshStandardMaterial attach="material" color="yellow" />
					</mesh>
					<mesh
						rotation={[-angleToRadians(90), 0, 0]}
						position={[0, 10, -7.5]}
						receiveShadow
					>
						<boxGeometry attach="geometry" args={[2, 16, 1]} />
						<meshStandardMaterial attach="material" color="yellow" />
					</mesh>
				</group>
			))}
		</>
	);
};

export default ATCCranes;
