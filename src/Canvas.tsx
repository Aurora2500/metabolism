import { Box, BoxProps } from '@mui/material';
import React, {useEffect, useRef} from 'react';
import { debounce } from './util';

type CanvasProps = {
	draw: (ctx: CanvasRenderingContext2D) => void,
	sx?: BoxProps['sx'],
};


const Canvas: React.FC<CanvasProps> = ({draw, sx}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
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

	
	return <Box sx={sx} ref={divRef}><canvas ref={canvasRef}/></Box>;
};

export default Canvas;