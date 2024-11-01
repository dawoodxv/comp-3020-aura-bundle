import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		primary: '#0068ef',
		secondary: '#003c8a',
		accent: '#ffffff',
		background: '#ffffff',
		text: '#373737',
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
