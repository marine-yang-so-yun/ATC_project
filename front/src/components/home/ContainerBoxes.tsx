import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { ContainerBoxesProps } from "types/simulator";

const ContainerBoxes = ({ count, boxes }: ContainerBoxesProps) => {
	const tempBoxes = new THREE.Object3D();
	const meshRef = useRef<THREE.InstancedMesh | null>(null);
	const outline = useLoader(
		THREE.TextureLoader,
		process.env.PUBLIC_URL + "/outline-box.png"
	);

	useFrame(() => {
		if (meshRef.current) {
			boxes.current.forEach((box, i) => {
				tempBoxes.position.copy(box.position);
				tempBoxes.updateMatrix();
				meshRef.current?.setMatrixAt(i, tempBoxes.matrix);
			});
			meshRef.current.instanceMatrix.needsUpdate = true;
		}
	});

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			<boxGeometry attach="geometry" args={[2, 1, 1]} />
			<meshStandardMaterial attach="material" color="#f2f2f2" map={outline} />
		</instancedMesh>
	);
};

export default ContainerBoxes;
