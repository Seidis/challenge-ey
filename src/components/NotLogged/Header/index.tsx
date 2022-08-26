import Grid from '@mui/material/Unstable_Grid2';
import styles from './Header.module.scss';

import { ReactComponent as Logo } from 'assets/ey_text.svg';
import NavBar from './NavBar';

export default function Header() {
	return (
		<header>
			<div className={styles.header}>
				<Grid container spacing={2}>
					<Grid xs={3}>
						<Logo className={styles.logo} />
					</Grid>
					<Grid xs={9}>
						<NavBar />
					</Grid>
				</Grid>
			</div>
		</header>
	);
}