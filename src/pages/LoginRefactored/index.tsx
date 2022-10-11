import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { ReactComponent as Logo } from 'assets/ey_text.svg';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Checkbox, Divider, FormControlLabel, FormGroup, Grid, IconButton, Snackbar } from '@mui/material';
import Stack from '@mui/system/Stack';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from 'context/AuthProvider/utils';
import { IUser } from 'context/AuthProvider/types';

import { ColorButton } from 'components/ColorButton';
export default function Home() {

    // Navigation
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    // Form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function onFinish(values: { email: string, password: string }) {

        setLoading(true);

        try {
            const response = await LoginRequest(values.email, values.password);

            const payload = { id: response.id, token: response.access_token, role: response.role };

            setUser(payload);
            await setUserLocalStorage(payload);
            setLoading(false);
            navigate('/dashboard', { replace: true });
        } catch (error) {
            setError(true);
            setLoading(false);
            setOpenSnackbar(true);
        }


    }

    // eslint-disable-next-line
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user);
            navigate('/dashboard');
        }
    }, [loading]);

    return (
        <div className={styles.container} >
            <>
                <div className={styles.auth}>
                    <div className={styles.auth_content}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                            >
                                <Logo style={{ width: '150px', height: '100px' }} />
                            </Grid>
                        </Grid>
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
                                        onClick={() => onFinish({ email, password })}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        Entrar
                                    </ColorButton>
                                    <Button
                                        variant="text"
                                        color='inherit'
                                        onClick={() => navigate('/register')}
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
                <Snackbar
                    open={openSnackbar}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity='error'
                    >
                        <AlertTitle>Erro</AlertTitle>
                        <strong>Usuário e/ou senha inválidos</strong>
                    </Alert>
                </Snackbar>
            </>
        </div >
    );
}

