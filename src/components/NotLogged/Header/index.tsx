import Grid from '@mui/material/Unstable_Grid2';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from 'assets/ey_text.svg';
import { Link } from 'react-router-dom';
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
}];

export default function Header() {
	return (
		<header>
			<div className={styles.header}>
				<Grid container>
					<Grid xs={3}>
						<Logo className={styles.logo} />
					</Grid>
					<Grid xs={9}>
						<div className={styles.topnav}>
							<ButtonGroup variant="text" aria-label="Navigation Bar" >
								{links.map((link, index) => (
									<Button key={index} className={styles.menuItem} color='inherit' >
										<Link to={link.path} className={styles.link}>{link.name}</Link>
									</Button>
								))}
							</ButtonGroup>
						</div>
					</Grid>
				</Grid>
			</div>
		</header>
	);
}