import { createTheme, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
	palette: {
		mode: 'light',
		primary: {
			main: '#2e7d32',
		},
		secondary: {
			main: '#ff8f00',
		},
	},
};

export const theme = createTheme(themeOptions);
