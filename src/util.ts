import { Nulled, Stat } from './types';

export const isFull = (x: Nulled<Stat>): x is Stat => {
	return (
		x.age !== null &&
		x.gender !== null &&
		x.height !== null &&
		x.weight !== null
	);
};

export const debounce = (fn: () => void, ms: number) => {
	let timeoutId: number;
	let intervalId: number | undefined = undefined;
	return () => {
		clearTimeout(timeoutId);
		if(intervalId === undefined) {
			intervalId = setInterval(() => {
				fn();
			}, ms);
		}
		timeoutId = setTimeout(() => {
			clearInterval(intervalId);
			intervalId = undefined;
			fn();
		}, ms);
	};
};
