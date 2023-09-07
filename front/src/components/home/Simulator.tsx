import React, { useEffect, useRef, useState } from "react";
import { PerspectiveCamera, OrbitControls, Stats } from "@react-three/drei";
import * as S from "styles/components/home/simulator.style";
import { CurrentContainerWorkData, SocketContainerData } from "types/api";
import * as THREE from "three";
import apiService from "api";
import { BoxPosition } from "types/simulator";
import ContainerBoxes from "./ContainerBoxes";
import Block from "./Block";
import { moveBoxAnimation } from "./animation";

export const angleToRadians = (angleInDeg: number) =>
	(Math.PI / 180) * angleInDeg;

const Floor = () => {
	return (
		<mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
			<planeGeometry args={[160, 80]} />
			<meshStandardMaterial color="#a0f4a4" />
		</mesh>
	);
};

const Simulator = () => {
	const [containerWorkList, setContainerWorkList] =
		useState<CurrentContainerWorkData[]>();
	const [count, setCount] = useState<number>(0);
	const boxes = useRef<BoxPosition[]>([]);
	const maxBlockList = useRef<{ [block: string]: Block }>({});

	const wsUrl = process.env.REACT_APP_SOCKET_URL;

	useEffect(() => {
		if (!wsUrl) return;
		const ws = new WebSocket(wsUrl);

		ws.onmessage = (event) => {
			const newData: SocketContainerData[] = JSON.parse(event.data);

			if (newData && newData.length > 0) {
				setCount((prev) => prev + newData.length);
				newData.forEach(async (newItem) => {
					const fromPosition = new THREE.Vector3(
						maxBlockList.current[newItem.block2].x + newItem.bay1 * 2,
						0.5 + newItem.tier1,
						maxBlockList.current[newItem.block2].z + newItem.row1
					);

					const toPosition = new THREE.Vector3(
						maxBlockList.current[newItem.block2].x + newItem.bay2 * 2,
						0.5 + newItem.tier2,
						maxBlockList.current[newItem.block2].z + newItem.row2
					);

					const newBox = {
						position: fromPosition,
					};

					boxes.current.push(newBox);

					await moveBoxAnimation(newBox.position, toPosition);

					newBox.position.copy(toPosition);
				});
			}
		};

		return () => {
			ws.close();
		};
	}, [wsUrl]);

	useEffect(() => {
		const fetchCurrentContainerData = async () => {
			try {
				const blockRes = await apiService.containerService.getMaxBlock();
				blockRes.data.forEach(
					({ block }) => (maxBlockList.current[block] = new Block(block))
				);

				const containerRes =
					await apiService.containerService.getCurrentContainerWork();
				setContainerWorkList(containerRes.data);
				setCount((prev) => prev + containerRes.data.length);
				containerRes.data.forEach((newItem) => {
					const newBox = {
						position: new THREE.Vector3(
							maxBlockList.current[newItem.block].x + newItem.bay * 2,
							0.5 + newItem.tier,
							maxBlockList.current[newItem.block].z + newItem.row
						),
					};
					boxes.current.push(newBox);
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchCurrentContainerData();
	}, []);

	if (!containerWorkList) return null;
	return (
		<S.ThreeCanvas shadows>
			<PerspectiveCamera makeDefault position={[-100, 150, 150]} />
			<OrbitControls target={[0, 0, 0]} />
			<ContainerBoxes count={count} boxes={boxes} />
			<Floor />
			<ambientLight args={["#ffffff", 0.5]} />
			<directionalLight
				args={["#ffffff", 0.7]}
				position={[-90, 30, 0]}
				castShadow
			/>
			<Stats />
			<gridHelper args={[200, 130]} />
			<axesHelper args={[50]} />
		</S.ThreeCanvas>
	);
};

export default Simulator;
