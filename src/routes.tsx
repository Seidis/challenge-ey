import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavBar />} />
			</Routes>
		</BrowserRouter>
	);
}