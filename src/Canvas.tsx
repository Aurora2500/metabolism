import { Box, BoxProps } from '@mui/material';
import React, {useEffect, useRef} from 'react';
import { debounce } from './util';

type CanvasProps = {
	draw: (ctx: CanvasRenderingContext2D) => void,
	sx?: BoxProps['sx'],
	tooltipDraw?: (ctx: CanvasRenderingContext2D, pos: {x: number, y: number}) => boolean,
};


const Canvas: React.FC<CanvasProps> = ({draw, sx, tooltipDraw}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const tooltipRef = useRef<HTMLCanvasElement>(null);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if(canvas == null) return;
		const context = canvas?.getContext('2d');
		if(context == null) return;
		if(divRef.current == null) return;
		const div = divRef.current;
		canvas.width = divRef.current.clientWidth;
		canvas.height = divRef.current.clientHeight;

		draw(context);
		const event = debounce(() => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = div.clientWidth;
			canvas.height = div.clientHeight;
			draw(context);
		}, 100);

		window.addEventListener('resize', event);
		return () => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			window.removeEventListener('resize', event);
		};
	}, [draw]);

	useEffect(() => {
		if(tooltipDraw == null) return;
		const canvas = canvasRef.current;
		const tooltipCanvas = tooltipRef.current;

		if(canvas == null || tooltipCanvas == null) return;
		const tooltipCtx = tooltipCanvas.getContext('2d');
		if(tooltipCtx == null) return;

		const event = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = (e.clientX - rect.left) / (rect.right - rect.left);
			const y = (e.clientY - rect.top) / (rect.bottom - rect.top);
			tooltipCtx.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height);
			if(tooltipDraw(tooltipCtx, {x, y})) {
				tooltipCanvas.style.display = 'block';
				tooltipCanvas.style.left = `${e.clientX - rect.left}px`;
				tooltipCanvas.style.top = `${e.clientY - rect.top}px`;
			} else {
				tooltipCanvas.style.display = 'none';
			}
		};

		canvas.addEventListener('mousemove', event);
		return () => {
			tooltipCtx.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height);
			canvas.removeEventListener('mousemove', event);
		};
	}, [tooltipDraw]);

	return (
		<Box sx={[
			{
				position: 'relative',
			},
			...((Array.isArray(sx)) ? sx : [sx])
		]} ref={divRef}>
			<canvas ref={canvasRef}/>
			{ tooltipDraw && <canvas ref={tooltipRef} style={{position: 'absolute', pointerEvents: 'none'}}/> }
		</Box>
	);
};

export default Canvas;