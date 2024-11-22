import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		primary: '#89a996',
		secondary: '#587865',
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
