import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageWithNav from '../components/PageWithNav';

const ProtectedRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<PageWithNav homePage />} />
			<Route path="/bag" element={<PageWithNav bag />} />
			<Route path="/buildBundle" element={<PageWithNav buildBundle />} />
			<Route path="/exploreBundles" element={<PageWithNav exploreBundles />} />
			<Route path="/signIn" element={<PageWithNav signIn />} />
			<Route path="/signUp" element={<PageWithNav signUp />} />
			<Route path="/quiz" element={<PageWithNav quiz />} />
		</Routes>
	);
};

export default ProtectedRoutes;
