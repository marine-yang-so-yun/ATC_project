import React, { useEffect, useState } from "react";
import { PerspectiveCamera, OrbitControls, Html } from "@react-three/drei";
import * as S from "styles/components/home/simulator.style";
import { ContainerWorkData } from "types/api";
import * as THREE from "three";

interface ContainerSampleType {
	container: string;
	workcode: string;
	block1: string;
	bay1: number;
	row1: number;
	tier1: number;
	block2: string;
	bay2: number;
	row2: number;
	tier2: number;
}

const containerSampleData = [
	{
		container: "WYCO2458354",
		workcode: "GR",
		block1: "1B",
		bay1: 19,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 19,
		row2: 2,
		tier2: 2,
	},
	{
		container: "YVVD4786936",
		workcode: "VL",
		block1: "1B",
		bay1: 19,
		row1: 5,
		tier1: 2,
		block2: "1B",
		bay2: 19,
		row2: 0,
		tier2: 0,
	},
	{
		container: "JYEY4089276",
		workcode: "VL",
		block1: "1B",
		bay1: 19,
		row1: 6,
		tier1: 3,
		block2: "1B",
		bay2: 19,
		row2: 0,
		tier2: 0,
	},
	{
		container: "WZOL7119700",
		workcode: "VL",
		block1: "1B",
		bay1: 19,
		row1: 1,
		tier1: 2,
		block2: "1B",
		bay2: 19,
		row2: 0,
		tier2: 0,
	},
	{
		container: "VWKN3894065",
		workcode: "GR",
		block1: "1B",
		bay1: 19,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 19,
		row2: 5,
		tier2: 2,
	},
	{
		container: "VIOM2357233",
		workcode: "GR",
		block1: "1B",
		bay1: 19,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 19,
		row2: 4,
		tier2: 1,
	},
	{
		container: "GWEM8080080",
		workcode: "GR",
		block1: "1B",
		bay1: 19,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 19,
		row2: 4,
		tier2: 2,
	},
	{
		container: "UBAL9497937",
		workcode: "GR",
		block1: "1B",
		bay1: 19,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 19,
		row2: 6,
		tier2: 3,
	},
	{
		container: "HABL6590308",
		workcode: "GR",
		block1: "1B",
		bay1: 12,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 12,
		row2: 3,
		tier2: 3,
	},
	{
		container: "KJIJ7964073",
		workcode: "VL",
		block1: "1B",
		bay1: 9,
		row1: 4,
		tier1: 2,
		block2: "1B",
		bay2: 9,
		row2: 0,
		tier2: 0,
	},
	{
		container: "BCLR4963578",
		workcode: "VL",
		block1: "1B",
		bay1: 9,
		row1: 2,
		tier1: 1,
		block2: "1B",
		bay2: 9,
		row2: 0,
		tier2: 0,
	},
	{
		container: "HJUQ8489000",
		workcode: "GR",
		block1: "1B",
		bay1: 11,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 11,
		row2: 6,
		tier2: 2,
	},
	{
		container: "JVZX4038711",
		workcode: "GR",
		block1: "1B",
		bay1: 11,
		row1: 0,
		tier1: 0,
		block2: "1B",
		bay2: 11,
		row2: 6,
		tier2: 3,
	},
];

const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

const ContainerBox = ({ data }: { data: ContainerSampleType }) => {
	const boxGeometry = new THREE.BoxGeometry(2, 1, 1);
	const edges = new THREE.EdgesGeometry(boxGeometry);

	return (
		<group position={[data.row1 * 2, 0.5 + data.tier1, data.bay1]} castShadow>
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
			<PerspectiveCamera makeDefault position={[-20, 25, 20]} />
			<OrbitControls />
			{containerSampleData.map((data) => (
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
