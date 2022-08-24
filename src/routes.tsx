import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SidesBar from './components/SideBar';
import Vagas from 'pages/Vagas';
import Cursos from 'pages/Cursos';



export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SidesBar />}>
					<Route index element={<SidesBar />} />
					<Route path='Vagas' element={<Vagas />} />
					<Route path='Cursos' element={<Cursos />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}