import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		primary: '#0068ef',
		secondary: '#003c8a',
		tertiary: '#c69709',
		accent: '#fefaee',
		background: '#fffefa',
		text: '#ffffff',
		textLight: '#adadad',
	},
	styles: {
		global: {
			body: {
				bg: 'background',
				color: 'text',
			},
		},
	},
});

export default theme;
