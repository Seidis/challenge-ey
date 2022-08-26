import styles from './Header.module.scss';

export default function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				Perfil
			</div>
		</div>
	);
}