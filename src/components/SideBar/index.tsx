import { Link, useNavigate } from 'react-router-dom';
import SideBarItens from './SideBarItens';

import { ReactComponent as EYLogo } from 'assets/ey_text.svg';
import styles from './SideBar.module.scss';
import { FaBars } from 'react-icons/fa';

export default function SideBar() {

	const menuRoutes = SideBarItens;
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.top_section}>
				<FaBars className={styles.bars} />
				<EYLogo className={styles.logo} />
			</div>
			<ul className={styles.list}>
				{
					menuRoutes.map((routes, index) => (
						<li key={index} className={styles.lista}>
							<div className={styles.link_container}>
								<Link to={routes.path} className={styles.link}>
									<div className={styles.icon}>{routes.icon}</div>
									<div className={styles.link_text}>{routes.name}</div>
								</Link>
							</div>
						</li>
					))
				}
			</ul>
			<button
				onClick={() => {
					window.localStorage.removeItem('user');
					navigate(0);
				}}
			>
				sair
			</button>
		</div >
	);
}