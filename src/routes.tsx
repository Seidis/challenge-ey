import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Default from 'components/Default/Default';
// import NotFound from 'components/NotFound';
import { ProtectedLayout } from 'components/ProtectedLayout';

import Login from 'pages/LoginRefactored';
import Register from 'pages/RegisterRefactored';

import Dashboard from 'pages/Dashboard';

import Cursos from 'pages/Cursos';
import FormCursos from 'pages/Cursos/FormCursos';
import PageCursos from 'pages/Cursos/PageCursos';

import Vagas from 'pages/Vagas';
import PageVaga from 'pages/Vagas/PageVaga';
import FormVaga from 'pages/Vagas/FormVaga';


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
						<Route path='vagas/:id' element={<PageVaga />} />
						<Route path='vagas/form' element={<FormVaga />} />
						<Route path='vagas/form/:id' element={<FormVaga />} />
						<Route path='cursos' element={<Cursos />} />
						<Route path='cursos/:id' element={<PageCursos />} />
						<Route path='cursos/form' element={<FormCursos />} />
					</Route>
				</Routes>
			</ProtectedLayout>
		</BrowserRouter >
	);
}