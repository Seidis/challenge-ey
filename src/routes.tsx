import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Default from 'components/Default/Default';
// import NotFound from 'components/NotFound';
import { ProtectedLayout } from 'components/ProtectedLayout';

import Login from 'pages/LoginRefactored';
import Register from 'pages/Register';

import Cursos from 'pages/Cursos';
import Vagas from 'pages/Vagas';
import Dashboard from 'pages/Dashboard';


export default function AppRouter() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				{/* <Route path='*' element={<NotFound />} /> */}
			</Routes>
			<ProtectedLayout>
				<Routes>
					<Route path="/" element={<Default />}>
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='vagas' element={<Vagas />} />
						<Route path='cursos' element={<Cursos />} />
					</Route>
				</Routes>
			</ProtectedLayout>
		</BrowserRouter >
	);
}