import Header from 'components/Header';
import SideBar from 'components/SideBar';
import { Outlet } from 'react-router-dom';
import styles from './Default.module.scss';

export default function Default() {
	return (
		<div className={styles.container}>
			<SideBar />
			<section>
				<Outlet />
			</section>
		</div>
	);
}