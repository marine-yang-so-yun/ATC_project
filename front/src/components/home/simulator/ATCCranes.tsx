import React, { useRef } from "react";
import { CranePosition } from "types/simulator";
import { useFrame } from "@react-three/fiber";

const ATCCrane = ({ position }: { position: THREE.Vector3 }) => {
	const craneRef = useRef<THREE.Group>(null);

	useFrame(() => {
		if (craneRef.current) {
			craneRef.current.position.x = position.x;
			craneRef.current.position.z = position.z;
		}
	});

	return (
		<group ref={craneRef} position={position} castShadow receiveShadow>
			<mesh position={[0, 5, 0]}>
				<boxGeometry attach="geometry" args={[2, 10, 1]} />
				<meshStandardMaterial attach="material" color="yellow" />
			</mesh>
			<mesh position={[0, 5, -15]}>
				<boxGeometry attach="geometry" args={[2, 10, 1]} />
				<meshStandardMaterial attach="material" color="yellow" />
			</mesh>
			<mesh
				rotation={[-((Math.PI / 180) * 90), 0, 0]}
				position={[0.7, 9.5, -7.5]}
			>
				<boxGeometry attach="geometry" args={[0.5, 16, 1]} />
				<meshStandardMaterial attach="material" color="yellow" />
			</mesh>
			<mesh
				rotation={[-((Math.PI / 180) * 90), 0, 0]}
				position={[-0.7, 9.5, -7.5]}
			>
				<boxGeometry attach="geometry" args={[0.5, 16, 1]} />
				<meshStandardMaterial attach="material" color="yellow" />
			</mesh>
		</group>
	);
};

const ATCCranes = ({ cranes }: { cranes: CranePosition }) => {
	if (Object.keys(cranes).length === 0) return null;

	return (
		<>
			{Object.entries(cranes).map(([craneNum, position]) => (
				<ATCCrane key={craneNum} position={position} />
			))}
		</>
	);
};

export default ATCCranes;
