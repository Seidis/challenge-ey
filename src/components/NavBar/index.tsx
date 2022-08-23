import styles from './NavBar.module.scss';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function NavBar() {
	return (
		<>
			<div className={styles.navbar}>
				<Link to='#' className={styles.menuIten}>
					<FaBars className={classNames({
						[styles.menuIcon]: true
					})} />
				</Link>
			</div>
		</>
	);
}