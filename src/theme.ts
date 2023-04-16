import { createTheme } from '@mui/material';

const themeOptions = {
	palette: {
		type: 'light',
		primary: {
			main: '#2e7d32',
		},
		secondary: {
			main: '#ff8f00',
		},
	},
};

export const theme = createTheme(themeOptions);
