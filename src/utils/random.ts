export default function selectRandom<T>(arr: T[]): T {
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
}
