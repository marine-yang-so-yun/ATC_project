import Block from "components/home/simulator/Block";

export interface ContainerPosition {
	position: THREE.Vector3;
}

export interface ContainerBoxesProps {
	count: number;
	containers: React.MutableRefObject<ContainerPosition[]>;
}

export interface CranePosition {
	[crane: string]: THREE.Vector3;
}

export interface MaxBlockList {
	[block: string]: { position: Block; width: number; height: number };
}
