import { Children, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBarItens from './SideBarItens';

import { ReactComponent as EYLogo } from 'assets/ey.svg';
import styles from './SideBar.module.scss';
import { FaBars } from 'react-icons/fa';
import classNames from 'classnames';

export default function SideBar() {

	const [isOpen, setIsOpen] = useState(false);
	const menuRoutes = SideBarItens;

	return (
		<>
			<div className={styles.container}>
				<div className={classNames({
					[styles.sidebar]: true,
					[styles.sidebar__open]: !isOpen
				})}>
					<div className={styles.top_section}>
						<div className={classNames({
							[styles.bars]: true,
							[styles.bars__open]: isOpen,
							[styles.bars__closed]: !isOpen
						})}>
							<FaBars onClick={() => setIsOpen(!isOpen)} />
						</div>
						<div className={styles.logo}>
							<EYLogo
								className={classNames({
									// [styles.logo]: true,
									[styles.logo__open]: !isOpen
								})}
							/>
						</div>
					</div>
					{
						menuRoutes.map((routes, index) => (
							<Link to={routes.path} key={index} className={styles.link}>
								<div className={styles.icon}>{routes.icon}</div>
								<div className={classNames({
									[styles.link_text]: true,
									[styles.link_text__open]: !isOpen
								})}>{routes.name}</div>
							</Link>
						))
					}
				</div>
			</div>
		</>
	);
}