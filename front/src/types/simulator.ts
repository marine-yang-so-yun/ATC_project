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
