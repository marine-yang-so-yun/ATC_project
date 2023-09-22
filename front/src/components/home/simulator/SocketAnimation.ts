import { useEffect } from "react";
import { moveAnimation } from "./animation";
import { SocketContainerData } from "types/api";
import * as THREE from "three";
import { SocketAnimationProps } from "types/components";

const SocketAnimation = ({
	cranes,
	maxBlockList,
	containers,
	setCount,
}: SocketAnimationProps) => {
	const wsUrl = process.env.REACT_APP_SOCKET_URL;

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
						maxBlockList.current[newItem.block1].position.x + newItem.bay1 * 2,
						(newItem.tier1 === 0 ? 1 : newItem.tier1) - 0.5,
						maxBlockList.current[newItem.block1].position.z +
							(newItem.row1 === 0 ? -1 : newItem.row1)
					);

					if (
						fromPosition.y > 1 &&
						!containers.current.includes({
							position: new THREE.Vector3(
								fromPosition.x,
								fromPosition.y - 1,
								fromPosition.z
							),
						})
					) {
						for (let i = fromPosition.y - 1; i > 0; i--) {
							if (
								containers.current.includes({
									position: new THREE.Vector3(
										fromPosition.x,
										i,
										fromPosition.z
									),
								})
							)
								return;
							containers.current.push({
								position: new THREE.Vector3(fromPosition.x, i, fromPosition.z),
							});
							setCount((prev) => prev + 1);
						}
					}

					const toPosition = new THREE.Vector3(
						maxBlockList.current[newItem.block2].position.x + newItem.bay2 * 2,
						(newItem.tier2 === 0 ? 1 : newItem.tier2) - 0.5,
						maxBlockList.current[newItem.block2].position.z +
							(newItem.row2 === 0 ? -1 : newItem.row2)
					);
					containers.current.push({ position: fromPosition });
					setCount((prev) => prev + 1);

					const toCranePosition = new THREE.Vector3(
						maxBlockList.current[newItem.block2].position.x + newItem.bay2 * 2,
						0,
						maxBlockList.current[newItem.block2].position.z + 12
					);

					if (
						toPosition.y > 1 &&
						!containers.current.includes({
							position: new THREE.Vector3(
								toPosition.x,
								toPosition.y - 1,
								toPosition.z
							),
						})
					) {
						for (let i = toPosition.y - 1; i > 0; i--) {
							if (
								containers.current.includes({
									position: new THREE.Vector3(toPosition.x, i, toPosition.z),
								})
							)
								return;
							containers.current.push({
								position: new THREE.Vector3(toPosition.x, i, toPosition.z),
							});
							setCount((prev) => prev + 1);
						}
					}

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

	return null;
};

export default SocketAnimation;
