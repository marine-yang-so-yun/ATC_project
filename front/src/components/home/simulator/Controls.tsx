import React, { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useSelector } from "react-redux";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { AppState } from "store";

const Controls = () => {
	const orbitControlsRef = useRef<OrbitControlsImpl>(null);
	const selectedBlock: AppState["blockCrane"]["block"] = useSelector(
		(state: AppState) => state.blockCrane.block
	);

	useEffect(() => {
		const orbit = orbitControlsRef.current;
		if (orbit && selectedBlock) {
			if (selectedBlock === "전체") {
				orbit.target.set(0, 0, 0);
				orbit.update();
				orbit.setAzimuthalAngle(0);
				orbit.setPolarAngle(0.95);
				orbit.minDistance = 0;
				orbit.maxDistance = 100;
			} else {
				const x =
					(7 - Number(selectedBlock[0])) * 100 +
					42 +
					(Number(selectedBlock[0]) - 7) * 16;
				const z = (selectedBlock[1].charCodeAt(0) - 67) * 30 + 19;
				orbit.target.set(x, 0, z);
				orbit.update();
				orbit.setAzimuthalAngle(-0.3);
				orbit.setPolarAngle(0.8);
				orbit.minDistance = 35;
				orbit.maxDistance = 55;
			}
		}
	}, [selectedBlock]);

	return (
		<>
			<PerspectiveCamera makeDefault position={[0, 50, 70]} zoom={0.7} />
			<OrbitControls
				ref={orbitControlsRef}
				target={[0, 0, 0]}
				minPolarAngle={0}
				maxPolarAngle={(Math.PI / 180) * 80}
				minAzimuthAngle={-((Math.PI / 180) * 80)}
				maxAzimuthAngle={(Math.PI / 180) * 80}
				maxDistance={100}
			/>
		</>
	);
};

export default Controls;
