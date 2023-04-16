import React from 'react';
import Canvas from './Canvas';
import { Stat } from './types';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const invlerp = (a: number, b: number, v: number) => (v - a) / (b - a);
const remap = (from_start: number, from_end: number, to_start: number, to_end: number) => (x: number) => lerp(to_start, to_end, invlerp(from_start, from_end, x));

const bmiRange = [
	{min: 15, max: 18.5, color: 'red'},
	{min: 18.5, max: 25, color: 'green'},
	{min: 25, max: 30, color: 'orange'},
	{min: 30, max: 35, color: 'red'},
];

const draw = (stats: Stat) => (ctx: CanvasRenderingContext2D) => {
	const height = ctx.canvas.height;
	const width = ctx.canvas.width;

	const start_x = 0.05 * width;
	const end = 0.95 * width;
	const half_y = height / 2;


	const map = remap(15, 35, start_x, end);

	bmiRange.forEach(({min, max, color}) => {
		ctx.lineWidth = 0.05 * height;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(map(min), half_y);
		ctx.lineTo(map(max), half_y);
		ctx.stroke();

		ctx.lineWidth = 0.03 * height;
		// draw the tick
		for(let i = Math.ceil(min); i <= max; i++) {
			const isMultipleOfFive = i % 5 === 0;
			const tickHeight = isMultipleOfFive ? 0.10 : 0.06;
			ctx.beginPath();
			ctx.moveTo(map(i), half_y - tickHeight * height);
			ctx.lineTo(map(i), half_y + tickHeight * height);
			ctx.stroke();
			if(isMultipleOfFive) {
				ctx.font = `${0.15 * height}px sans-serif`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(`${i}`, map(i), half_y + 0.25 * height);
			}
		}
	});

	const bmi = stats.weight / (stats.height / 100) ** 2;
	ctx.fillText(`${stats.weight.toFixed(2)}`, map(bmi), half_y - 0.25 * height);
};


const Result = ({stats}: {stats: Stat}) => {
	const {gender, age, height, weight} = stats;
	return (
		<>
			BMI
			<Canvas sx={{border: '1px solid black', maxHeight: 150}} draw={draw(stats)}/>
		</>
	);
};

export default Result;