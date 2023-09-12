import React, { useEffect, useRef, useState } from "react";
import { PerspectiveCamera, OrbitControls, Stats } from "@react-three/drei";
import * as S from "styles/components/home/simulator.style";
import { CurrentContainerWorkData, SocketContainerData } from "types/api";
import * as THREE from "three";
import apiService from "api";
import { ContainerPosition, CranePosition } from "types/simulator";
import ContainerBoxes from "./ContainerBoxes";
import Block from "./Block";
import { moveBoxAnimation, moveCraneAnimation } from "./animation";
import ATCCranes from "./ATCCranes";
import Floor from "./Floor";

const Simulator = () => {
	const [containerWorkList, setContainerWorkList] =
		useState<CurrentContainerWorkData[]>();
	const [count, setCount] = useState<number>(0);
	const containers = useRef<ContainerPosition[]>([]);
	const cranes = useRef<CranePosition>({});
	const maxBlockList = useRef<{ [block: string]: Block }>({});

	const wsUrl = process.env.REACT_APP_SOCKET_URL;

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
					if (newItem.tier === 0) return;
					containers.current.push({
						position: new THREE.Vector3(
							maxBlockList.current[newItem.block].x + newItem.bay * 2,
							-0.5 + newItem.tier,
							maxBlockList.current[newItem.block].z + newItem.row
						),
					});
				});

				const craneRes =
					await apiService.containerService.getCurrentWorkByBlock();
				craneRes.data.forEach(
					(item) =>
						(cranes.current[item.crane] = new THREE.Vector3(
							maxBlockList.current[item.block].x + item.bay * 2,
							0,
							maxBlockList.current[item.block].z + 12
						))
				);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCurrentContainerData();
	}, []);

	useEffect(() => {
		if (!wsUrl) return;
		const ws = new WebSocket(wsUrl);

		ws.onmessage = (event) => {
			const newData: SocketContainerData[] = JSON.parse(event.data);

			if (newData && newData.length > 0) {
				setCount((prev) => prev + newData.length);
				newData.forEach(async (newItem) => {
					const craneNum = newItem.crane;
					const prevCrane = cranes.current[craneNum];

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

					const cranePosition = new THREE.Vector3(
						maxBlockList.current[newItem.block2].x + newItem.bay2 * 2,
						0,
						maxBlockList.current[newItem.block2].z + 12
					);

					containers.current.push({ position: fromPosition });
					await moveCraneAnimation(prevCrane, cranePosition);
					cranes.current[craneNum] = cranePosition;
					await moveBoxAnimation(fromPosition, toPosition);
				});
			}
		};

		return () => {
			ws.close();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wsUrl]);

	if (!containerWorkList) return null;
	return (
		<S.ThreeCanvas shadows>
			<PerspectiveCamera makeDefault position={[0, 120, 80]} zoom={1.5} />
			<OrbitControls target={[0, 0, 0]} />
			<ContainerBoxes count={count} containers={containers} />
			<Floor />
			<ATCCranes cranes={cranes.current} />
			<ambientLight args={["#ffffff", 0.5]} />
			<directionalLight
				args={["#ffffff", 0.7]}
				position={[-90, 30, 0]}
				castShadow
			/>
			<Stats />
			<gridHelper args={[160, 160]} />
			<axesHelper args={[50]} />
		</S.ThreeCanvas>
	);
};

export default Simulator;
