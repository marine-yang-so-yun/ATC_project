class Block {
	x: number;
	z: number;

	constructor(block: string) {
		this.x = 8 + (7 - Number(block[0])) * 80;
		this.z = 8 + (block[1].charCodeAt(0) - 67) * 24;
	}
}

export default Block;
