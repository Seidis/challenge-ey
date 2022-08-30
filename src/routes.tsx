import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import SidesBar from 'components/SideBar';
import Vagas from 'pages/Vagas';
import Cursos from 'pages/Cursos';
import Default from 'components/Default';
import Login from 'pages/Login';
import { useEffect } from 'react';



export default function AppRouter() {

	const user = window.localStorage.getItem('user');

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={user ? <Default /> : <Login />}>
					<Route index element={<></>} />
					<Route path='vagas' element={<Vagas />} />
					<Route path='cursos' element={<Cursos />} />
				</Route>
			</Routes>
		</BrowserRouter >
	);
}