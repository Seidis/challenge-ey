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
			<div className={classNames({
				[styles.sidebar]: true,
				[styles.sidebar__closed]: !isOpen
			})} onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
				<div className={classNames({
					[styles['sidebar__top-section']]: true,
					[styles['sidebar__top-section__closed']]: !isOpen
				})}>
					<div className={classNames({
						[styles.sidebar__bars]: true,
						[styles.sidebar__bars__closed]: isOpen
					})}>
						<FaBars />
					</div>
					<EYLogo
						className={classNames({
							[styles['sidebar__top-section__logo']]: true,
							[styles['sidebar__top-section__logo__closed']]: !isOpen
						})}
					/>
				</div>
				{
					menuRoutes.map((routes, index) => (
						<div key={index} className={styles.link}>
							<Link to={routes.path} className={styles.link}>
								<div className={styles.icon}>{routes.icon}</div>
								<div className={classNames({
									[styles.link_text]: true,
									[styles.link_text__closed]: !isOpen
								})}>{routes.name}</div>
							</Link>
						</div>
					))
				}
			</div>
		</div >
	);
}