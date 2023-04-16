export type Stat = {
	gender: 'male' | 'female';
	age: number;
	height: number;
	weight: number;
};

export type Nulled<T> = {
	[P in keyof T]: T[P] | null;
};