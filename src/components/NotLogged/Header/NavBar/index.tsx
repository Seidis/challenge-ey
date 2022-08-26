import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const links = [{
	name: 'Home',
	path: '/'
}, {
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
			<ButtonGroup variant="text" aria-label="Navigation Bar" >
				{links.map((link, index) => (
					<Button key={index} className={styles.menuItem}>
						<Link to={link.path} className={styles.link}>{link.name}</Link>
					</Button>
				))}
			</ButtonGroup>
		</div>
	);
}