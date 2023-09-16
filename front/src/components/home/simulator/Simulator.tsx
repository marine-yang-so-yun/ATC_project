import React, { useEffect, useRef, useState } from "react";
import { PerspectiveCamera, OrbitControls, Stats } from "@react-three/drei";
import { CurrentContainerWorkData, SocketContainerData } from "types/api";
import * as THREE from "three";
import apiService from "api";
import { ContainerPosition, CranePosition } from "types/simulator";
import ContainerBoxes from "./ContainerBoxes";
import Block from "./Block";
import { moveAnimation } from "./animation";
import ATCCranes from "./ATCCranes";
import Floor from "./Floor";
import { useSelector } from "react-redux";
import { AppState } from "store";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { angleToRadians } from "./angleToRadians";

const Simulator = () => {
	const [containerWorkList, setContainerWorkList] = useState<
		CurrentContainerWorkData[]
	>([]);
	const [count, setCount] = useState<number>(0);
	const containers = useRef<ContainerPosition[]>([]);
	const cranes = useRef<CranePosition>({});
	const maxBlockList = useRef<{ [block: string]: Block }>({});
	const selectedBlock: AppState["blockCrane"]["block"] = useSelector(
		(state: AppState) => state.blockCrane.block
	);
	const orbitControlsRef = useRef<OrbitControlsImpl>(null);

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
				setCount(containerRes.data.length);
				containerRes.data.forEach((newItem) => {
					if (newItem.tier === 0) return;
					containers.current.push({
						position: new THREE.Vector3(
							maxBlockList.current[newItem.block].x + newItem.bay * 2,
							newItem.tier - 0.5,
							maxBlockList.current[newItem.block].z + newItem.row
						),
					});
				});

				const craneRes =
					await apiService.containerService.getCurrentWorkByCrane();
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
				newData.forEach(async (newItem) => {
					const craneNum = newItem.crane;
					const prevCrane = cranes.current[craneNum];

					const fromPosition = new THREE.Vector3(
						maxBlockList.current[newItem.block].x + newItem.bay1 * 2,
						(newItem.tier1 === 0 ? 1 : newItem.tier1) - 0.5,
						maxBlockList.current[newItem.block].z +
							(newItem.row1 === 0 ? -1 : newItem.row1)
					);

					const toPosition = new THREE.Vector3(
						maxBlockList.current[newItem.block].x + newItem.bay2 * 2,
						(newItem.tier2 === 0 ? 1 : newItem.tier2) - 0.5,
						maxBlockList.current[newItem.block].z +
							(newItem.row2 === 0 ? -1 : newItem.row2)
					);
					containers.current.push({ position: fromPosition });
					setCount((prev) => prev + 1);

					const toCranePosition = new THREE.Vector3(
						maxBlockList.current[newItem.block].x + newItem.bay2 * 2,
						0,
						maxBlockList.current[newItem.block].z + 12
					);

					await moveAnimation(
						fromPosition,
						toPosition,
						prevCrane,
						toCranePosition
					);

					if (newItem.row2 === 0 && newItem.tier2 === 0) {
						const index = containers.current.findIndex((container) => {
							return (
								container.position.x === fromPosition.x &&
								container.position.y === fromPosition.y &&
								container.position.z === fromPosition.z
							);
						});

						if (index !== -1) {
							containers.current.splice(index, 1);
							setCount((prev) => prev - 1);
						}
					}

					cranes.current[craneNum] = toCranePosition;
				});
			}
		};

		return () => {
			ws.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wsUrl]);

	if (containerWorkList.length === 0) return null;

	return (
		<>
			<PerspectiveCamera makeDefault position={[0, 50, 70]} zoom={0.7} />
			<OrbitControls
				ref={orbitControlsRef}
				target={[0, 0, 0]}
				minPolarAngle={0}
				maxPolarAngle={angleToRadians(80)}
				minAzimuthAngle={-angleToRadians(80)}
				maxAzimuthAngle={angleToRadians(80)}
				maxDistance={100}
			/>
			<ContainerBoxes count={count} containers={containers} />
			<Floor />
			<ATCCranes cranes={cranes.current} />
			<ambientLight args={["#ffffff", 0.5]} />
			<directionalLight
				args={["#ffffff", 1]}
				position={[-80, 80, 0]}
				castShadow
			/>
			<Stats />
		</>
	);
};

export default Simulator;
