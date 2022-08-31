import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Default from 'components/Default';

import Login from 'pages/Login';
import Register from 'pages/Login/Register';

import Cursos from 'pages/Cursos';
import Vagas from 'pages/Vagas';


export default function AppRouter() {

	const user = window.localStorage.getItem('user');

	return (
		<SnackbarProvider maxSnack={3}>
			<BrowserRouter>
				<Routes>
					<Route path='/register' element={<Register />} />
					<Route path="/" element={user ? <Default /> : <Login />}>
						<Route index element={<></>} />
						<Route path='vagas' element={<Vagas />} />
						<Route path='cursos' element={<Cursos />} />
					</Route>
				</Routes>
			</BrowserRouter >
		</SnackbarProvider>
	);
}