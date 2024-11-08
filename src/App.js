import React from 'react';
import Router from './routes/Router';
import './assets/styles/fonts.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as RouterProvider } from 'react-router-dom';
import theme from './theme';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<RouterProvider>
				<Router />
			</RouterProvider>
		</ChakraProvider>
	);
}


export default App;
