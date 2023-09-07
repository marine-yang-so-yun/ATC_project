export interface BoxPosition {
	position: THREE.Vector3;
}

export interface ContainerBoxesProps {
	count: number;
	boxes: React.MutableRefObject<BoxPosition[]>;
}
