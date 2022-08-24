import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidesBar from './components/SideBar';



export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SidesBar />} />
			</Routes>
		</BrowserRouter>
	);
}