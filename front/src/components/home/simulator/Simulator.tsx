import React, { useEffect, useRef, useState } from "react";
import { CurrentContainerWorkData } from "types/api";
import * as THREE from "three";
import apiService from "api";
import { ContainerPosition, CranePosition } from "types/simulator";
import ContainerBoxes from "./ContainerBoxes";
import Block from "./Block";
import ATCCranes from "./ATCCranes";
import Floor from "./Floor";
import Controls from "./Controls";
import SocketAnimation from "./SocketAnimation";

const Simulator = () => {
	const [containerWorkList, setContainerWorkList] = useState<
		CurrentContainerWorkData[]
	>([]);
	const [count, setCount] = useState<number>(0);
	const containers = useRef<ContainerPosition[]>([]);
	const cranes = useRef<CranePosition>({});
	const maxBlockList = useRef<{
		[block: string]: { position: Block; width: number; height: number };
	}>({});

	useEffect(() => {
		const fetchMaxBlockData = async () => {
			try {
				const { data } = await apiService.containerService.getMaxBlock();

				data.forEach(({ block, maxbay, maxrow }) => {
					maxBlockList.current[block] = {
						position: new Block(block),
						width: maxbay,
						height: maxrow,
					};
				});
			} catch (error) {
				console.log(error);
			}
		};

		const fetchContainerData = async () => {
			try {
				const { data } =
					await apiService.containerService.getCurrentContainerWork();

				setContainerWorkList(data);
				setCount(data.length);
				containers.current = data.map((newItem) => ({
					position: new THREE.Vector3(
						maxBlockList.current[newItem.block2].position.x + newItem.bay2 * 2,
						newItem.tier2 - 0.5,
						maxBlockList.current[newItem.block2].position.z + newItem.row2
					),
				}));
			} catch (error) {
				console.log(error);
			}
		};

		const fetchCraneData = async () => {
			try {
				const { data } =
					await apiService.containerService.getCurrentWorkByCrane();

				data.forEach((item) => {
					cranes.current[item.crane] = new THREE.Vector3(
						maxBlockList.current[item.block2].position.x + item.bay2 * 2,
						0,
						maxBlockList.current[item.block2].position.z + 12
					);
				});
			} catch (error) {
				console.log(error);
			}
		};

		const fetchData = async () => {
			await Promise.all([
				fetchMaxBlockData(),
				fetchContainerData(),
				fetchCraneData(),
			]);
		};

		fetchData();
	}, []);

	if (containerWorkList.length === 0) return null;

	return (
		<>
			<Controls />
			<SocketAnimation
				cranes={cranes}
				maxBlockList={maxBlockList}
				containers={containers}
				setCount={setCount}
			/>
			<ContainerBoxes count={count} containers={containers} />
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
			<ATCCranes cranes={cranes.current} />
			<ambientLight args={["#ffffff", 0.5]} />
			<directionalLight
				args={["#ffffff", 1]}
				position={[-80, 80, 0]}
				castShadow
			/>
		</>
	);
};

export default Simulator;
