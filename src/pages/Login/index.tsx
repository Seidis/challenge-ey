import { useState } from 'react';
import styles from './Login.module.scss';
import { ReactComponent as Logo } from 'assets/ey_text.svg';

import { firebaseApp } from 'data/__firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Divider, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import Stack from '@mui/system/Stack';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';

export default function Home() {

	const ColorButton = styled(Button)<ButtonProps>(({
		color: '#58595B',
		backgroundColor: '#FBE64D',
		'&:hover': {
			backgroundColor: '#AA9C33',
		},
	}));

	// Database
	const db = getFirestore(firebaseApp);
	const userCollectionRef = collection(db, 'users');

	// Navigation
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	// Form
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');




	function handleSubmit() {
		setLoading(true);

		try {
			const getUser = async () => {
				const data = await getDocs(userCollectionRef);
				const users: any[] = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				const validation = users.find((user) => user.email === email && user.password === password);

				if (validation) {
					console.log('Login successful');
					localStorage.setItem('user', JSON.stringify(validation));
					navigate(0);
				} else {
					setError(true);
					console.log('Login failed');
				}
			};
			getUser();

		} catch (error) {
			setError(true);
			console.log(error);
		} finally {
			setError(false);
			setLoading(false);
		}

		setLoading(false);

	}

	return (
		<div className={styles.container} >
			<div className={styles.auth}>
				<div className={styles.auth_content}>
					<div className={styles.auth_logo}>
						<Logo style={{ width: '150px', height: '100px' }} />
					</div>
					{loading ?
						<div className={styles.loading}>
							<CircularProgress
								className={'styles.loading'}
								color='inherit'
								sx={{}}
							/>
						</div>
						: ''}
					<div className={styles.auth_form}>
						<FormGroup>
							<TextField
								sx={{ marginBottom: '20px' }}
								id="email"
								label="Email"
								variant="filled"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={error}
							/>
							<TextField
								id="password"
								label="Password"
								type="password"
								variant="filled"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								error={error}
								helperText={error ? 'Email ou senha incorretos' : ' '}
							/>
							<Stack
								direction="row"
								justifyContent="space-around"
								alignItems="center"
							>
								<FormControlLabel
									control={
										<Checkbox name="remember" />
									}
									label="Lembrar de mim"
								/>
								<Button color='inherit' >Esqueceu a senha?</Button>
							</Stack>
							<Stack
								sx={{ marginTop: '20px' }}
							>
								<ColorButton
									variant="contained"
									onClick={handleSubmit}
									sx={{ marginBottom: '20px' }}
								>
									Entrar
								</ColorButton>
								<Button
									variant="text"
									color='inherit'
								>
									Registre-se
								</Button>
							</Stack>
						</FormGroup>
						<Divider orientation="horizontal" flexItem sx={{ marginTop: '30px', marginBottom: '20px' }} />
						<Stack
							direction='row'
							spacing={4}
							justifyContent='center'
							alignItems='center'
							divider={<Divider orientation="vertical" flexItem />}
						>
							<IconButton aria-label="facebook">
								<FacebookIcon fontSize='large' />
							</IconButton>
							<IconButton aria-label="linkedin">
								<LinkedInIcon fontSize='large' />
							</IconButton>
							<IconButton aria-label="google">
								<GoogleIcon fontSize='large' />
							</IconButton>
						</Stack>
					</div>
				</div>
			</div>
		</div >
	);
}