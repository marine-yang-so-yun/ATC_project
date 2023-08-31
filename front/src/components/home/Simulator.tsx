import React, { useEffect, useState } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as S from "styles/components/home/simulator.style";
import { ContainerWorkData } from "types/api";

const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

const ContainerBox = () => {
	return (
		<mesh position={[0, 0, 0]} castShadow>
			<boxGeometry args={[2, 1, 1]} />
			<meshStandardMaterial color="#f2f2f2" />
		</mesh>
	);
};

const Floor = () => {
	return (
		<mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
			<planeGeometry args={[20, 20]} />
			<meshStandardMaterial color="#1f6523" />
		</mesh>
	);
};

const Simulator = () => {
	const [containerData, setContainerData] = useState<ContainerWorkData[]>([]);
	const wsUrl = process.env.REACT_APP_SOCKET_URL;

	useEffect(() => {
		if (!wsUrl) return;
		const ws = new WebSocket(wsUrl);

		ws.onmessage = (event) => {
			const newData = JSON.parse(event.data);
			setContainerData((prev) => [...prev, newData]);
		};

		return () => {
			ws.close();
		};
	}, [wsUrl]);

	return (
		<S.ThreeCanvas shadows>
			<PerspectiveCamera makeDefault position={[-20, 20, 20]} />
			<OrbitControls />
			<ContainerBox />
			<Floor />
			<ambientLight args={["#ffffff", 0.5]} />
			<directionalLight
				args={["#ffffff", 0.7]}
				position={[-1, 1, 0]}
				castShadow
			/>
		</S.ThreeCanvas>
	);
};

export default Simulator;
