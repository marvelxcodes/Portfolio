export type Square = { x: number; y: number; size: number };

type Point = [number, number];
type Bounds = { left: number; top: number; right: number; bottom: number };

const OUTWARD: readonly Point[] = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1]
];

const placeSquare = (bounds: Bounds, size: number, turn: number): Square => {
	switch (turn % 4) {
		case 0:
			return { x: bounds.right, y: bounds.top, size };
		case 1:
			return { x: bounds.left, y: bounds.bottom, size };
		case 2:
			return { x: bounds.left - size, y: bounds.top, size };
		default:
			return { x: bounds.left, y: bounds.top - size, size };
	}
};

const sharedEdge = ({ x, y, size }: Square, turn: number): [Point, Point] => {
	switch (turn % 4) {
		case 0:
			return [
				[x, y],
				[x, y + size]
			];
		case 1:
			return [
				[x, y],
				[x + size, y]
			];
		case 2:
			return [
				[x + size, y],
				[x + size, y + size]
			];
		default:
			return [
				[x, y + size],
				[x + size, y + size]
			];
	}
};

const samePoint = (a: Point, b: Point) => a[0] === b[0] && a[1] === b[1];

export const goldenSpiral = (turns: number) => {
	const squares: Square[] = [{ x: 0, y: 0, size: 1 }];
	const bounds: Bounds = { left: 0, top: 0, right: 1, bottom: 1 };
	let [previous, current] = [1, 1];
	let end: Point = [1, 0];
	let path = 'M0 1A1 1 0 0 1 1 0';

	for (let turn = 0; turn < turns; turn++) {
		const square = placeSquare(bounds, current, turn);
		const [first, second] = sharedEdge(square, turn);
		const pivot = samePoint(first, end) ? second : first;
		const [dx, dy] = OUTWARD[turn % 4];
		end = [pivot[0] + dx * current, pivot[1] + dy * current];
		path += `A${current} ${current} 0 0 1 ${end[0]} ${end[1]}`;

		squares.push(square);
		bounds.left = Math.min(bounds.left, square.x);
		bounds.top = Math.min(bounds.top, square.y);
		bounds.right = Math.max(bounds.right, square.x + current);
		bounds.bottom = Math.max(bounds.bottom, square.y + current);
		[previous, current] = [current, previous + current];
	}

	const viewBox = `${bounds.left} ${bounds.top} ${bounds.right - bounds.left} ${bounds.bottom - bounds.top}`;
	return { squares, path, viewBox };
};
