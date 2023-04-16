import { Nulled, Stat } from './types';

export const isFull = (x: Nulled<Stat>): x is Stat => {
	return (
		x.age !== null &&
		x.gender !== null &&
		x.height !== null &&
		x.weight !== null
	);
};