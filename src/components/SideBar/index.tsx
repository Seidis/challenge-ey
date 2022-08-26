import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBarItens from './SideBarItens';

import { ReactComponent as EYLogo } from 'assets/ey_text.svg';
import styles from './SideBar.module.scss';
import { FaBars } from 'react-icons/fa';
import classNames from 'classnames';

export default function SideBar() {

	const [isOpen, setIsOpen] = useState(false);
	const menuRoutes = SideBarItens;

	return (
		<div className={styles.container}>
			<div className={styles.top_section}>
				<FaBars />
			</div>
			<ul className={styles.list}>
				{
					menuRoutes.map((routes, index) => (
						<li key={index}>
							<Link to={routes.path} className={styles.link}>
								<div className={styles.icon}>{routes.icon}</div>
							</Link>
						</li>
					))
				}
			</ul>
		</div >
	);
}