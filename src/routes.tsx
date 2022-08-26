import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SidesBar from 'components/SideBar';
import Vagas from 'pages/Vagas';
import Cursos from 'pages/Cursos';
import Default from 'components/Default';
import NotLogged from 'components/NotLogged';
import Home from 'pages/Home';



export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NotLogged />}>
					<Route index element={<Home />} />
					<Route path='jobs' element={<Vagas />} />
					<Route path='courses' element={<Cursos />} />
				</Route>
				<Route path="/dashboard" element={<Default />}>
					<Route index element={<SidesBar />} />
					<Route path='/dashboard/vagas' element={<Vagas />} />
					<Route path='/dashboard/cursos' element={<Cursos />} />
				</Route>
			</Routes>
		</BrowserRouter >
	);
}