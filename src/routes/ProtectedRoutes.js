import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageWithNav from '../components/PageWithNav';

const ProtectedRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<PageWithNav homePage />} />
			<Route path="/bag" element={<PageWithNav bag />} />
			<Route path="/buildBundle" element={<PageWithNav buildBundle />} />
		</Routes>
	);
};

export default ProtectedRoutes;
