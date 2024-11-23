import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		primary: '#587865',
		secondary: '#89a996',
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
