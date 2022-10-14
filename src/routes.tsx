import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Default from 'components/Default/Default';
// import NotFound from 'components/NotFound';
import { ProtectedLayout } from 'components/ProtectedLayout';
import Unauthorized from 'components/Unauthorized';

import Login from 'pages/LoginRefactored';
import Register from 'pages/RegisterRefactored';

import Dashboard from 'pages/Dashboard';

import Cursos from 'pages/Cursos';
import FormCursos from 'pages/Cursos/FormCursos';
import PageCursos from 'pages/Cursos/PageCursos';

import Vagas from 'pages/Vagas';
import PageVaga from 'pages/Vagas/PageVaga';
import FormVaga from 'pages/Vagas/FormVaga';

import Profile from 'pages/Profile';
import PageCandidatos from 'pages/Candidatos';
import { getUserLocalStorage } from 'context/AuthProvider/utils';

import Missions from 'pages/Missions';

import Quiz from 'pages/Quiz';
import QuizPage from 'pages/Quiz/QuizPage';


export default function AppRouter() {

	const user = getUserLocalStorage();

	return (
		<>
			{console.log(user)}
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
							<Route path='vagas/form' element={
								user?.role === 'ADMIN' ? <FormVaga /> : <Unauthorized />
							} />
							<Route path='vagas/form/:id' element={
								user?.role === 'ADMIN' ? <FormVaga /> : <Unauthorized />
							} />

							<Route path='candidatos' element={
								user?.role === 'ADMIN' ? <PageCandidatos /> : <Unauthorized />
							} />

							<Route path='cursos' element={<Cursos />} />
							<Route path='cursos/:id' element={<PageCursos />} />
							<Route path='cursos/form' element={
								user?.role === 'ADMIN' ? <FormCursos /> : <Unauthorized />
							} />

							<Route path='profile' element={<Profile />} />

							<Route path='missions' element={<Missions />} />

							<Route path='quiz' element={<Quiz />} />
							<Route path='quiz/:category/:difficulty' element={<QuizPage />} />
						</Route>
					</Routes>
				</ProtectedLayout>
			</BrowserRouter >
		</>
	);
}