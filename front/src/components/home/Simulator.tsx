import React, { useEffect, useState } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as S from "styles/components/home/simulator.style";
import { ContainerWorkData, CurrentContainerWorkData } from "types/api";
import * as THREE from "three";
import apiService from "api";

const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

const ContainerBox = ({ data }: { data: CurrentContainerWorkData }) => {
	const boxGeometry = new THREE.BoxGeometry(2, 1, 1);
	const edges = new THREE.EdgesGeometry(boxGeometry);

	return (
		<group position={[data.bay * 2, 0.5 + data.tier, data.row]} castShadow>
			<mesh geometry={boxGeometry}>
				<meshStandardMaterial color="#f2f2f2" />
			</mesh>
			<lineSegments geometry={edges}>
				<lineBasicMaterial color="black" linewidth={1} />
			</lineSegments>
		</group>
	);
};

const Floor = () => {
	return (
		<mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
			<planeGeometry args={[50, 50]} />
			<meshStandardMaterial color="#1f6523" />
		</mesh>
	);
};

const Simulator = () => {
	const [containerWorkList, setContainerWorkList] =
		useState<CurrentContainerWorkData[]>();
	const [containerData, setContainerData] = useState<ContainerWorkData>();
	const wsUrl = process.env.REACT_APP_SOCKET_URL;

	useEffect(() => {
		if (!wsUrl) return;
		const ws = new WebSocket(wsUrl);

		ws.onmessage = (event) => {
			const newData = JSON.parse(event.data);
			setContainerData(newData);
		};

		return () => {
			ws.close();
		};
	}, [wsUrl]);

	useEffect(() => {
		const fetchCurrentContainerData = async () => {
			try {
				const { data } =
					await apiService.containerService.getCurrentContainerWork();
				setContainerWorkList(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCurrentContainerData();
	}, []);

	if (!containerWorkList) return null;
	return (
		<S.ThreeCanvas shadows>
			<PerspectiveCamera makeDefault position={[-20, 25, 20]} />
			<OrbitControls />
			{containerWorkList.map((data) => (
				<ContainerBox key={data.container} data={data} />
			))}
			<Floor />
			<ambientLight args={["#ffffff", 0.5]} />
			<directionalLight
				args={["#ffffff", 0.7]}
				position={[-3, 2, -1]}
				castShadow
			/>
		</S.ThreeCanvas>
	);
};

export default Simulator;
