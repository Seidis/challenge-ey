import SideBar from 'components/SideBar';
import { Children } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Default.module.scss';

export default function Default() {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<SideBar />
			</div>
			<div style={{ display: 'block', width: '100%', padding: '15px' }}>
				<div style={{ padding: '15px', display: 'flex', background: '#d4d4d4', 'borderRadius': '4px' }}>
					<Outlet />
				</div>
			</div>
		</div >
	);
}