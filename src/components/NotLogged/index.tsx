import styles from './Home.module.scss';

import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Home() {
	return (
		<>
			<Header />
			<section className={styles.body}>
				<Outlet />
			</section>
		</>
	);
}