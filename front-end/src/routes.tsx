import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import OldDefault from 'components/OldDefault';
import Default from 'components/Default/Default';

import Login from 'pages/Login';
import Register from 'pages/Register';

import Cursos from 'pages/Cursos';
import Vagas from 'pages/Vagas';


export default function AppRouter() {

	const user = window.localStorage.getItem('user');

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path="/" element={user ? <Default /> : <Login />}>
					<Route index element={<Vagas />} />
					<Route path='vagas' element={<Vagas />} />
					<Route path='cursos' element={<Cursos />} />
				</Route>
			</Routes>
		</BrowserRouter >
	);
}