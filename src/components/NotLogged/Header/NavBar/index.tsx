import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';

const links = [{
	name: 'Vagas',
	path: '/jobs'
}, {
	name: 'Cursos',
	path: '/courses'
}, {
	name: 'Sobre Nós',
	path: '/about_us'
}];

export default function NavBar() {
	return (
		<div className={styles.topnav}>
			{links.map((link, index) => (
				<Link key={index} to={link.path} className={styles.link}>{link.name}</Link>
			))}
		</div>
	);
}