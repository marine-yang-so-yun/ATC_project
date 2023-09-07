class Block {
	x: number;
	z: number;

	constructor(block: string) {
		this.x = -4 + (7 - Number(block[0])) * 70;
		this.z = 6 + (block[1].charCodeAt(0) - 67) * 18;
	}
}

export default Block;
