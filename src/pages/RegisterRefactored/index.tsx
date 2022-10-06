import { useEffect, useState } from 'react';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertTitle, Backdrop, Box, Button, CircularProgress, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material';

import { ReactComponent as Logo } from 'assets/ey_text.svg';
import PasswordInput from './PasswordInput';
import { ColorButton } from 'components/ColorButton';

import { Api } from 'api/api';
import { validateEmail } from 'utils/__utils';
import Termo from './Termo';

export default function Register() {
    const navigate = useNavigate();

    const [check, setCheck] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('error');
    const [snackbarTitle, setSnackbarTitle] = useState('Erro');
    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [message, setMessage] = useState('');

    async function onClick() {
        setLoading(true);
        if (name === '' || surname === '' || email === '' || password === '' || confirmPassword === '') {
            setMessage('Preencha todos os campos');
            setOpenSnackbar(true);
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setMessage('A senha deve ter no mínimo 8 caracteres');
            setPasswordError(true);
            setOpenSnackbar(true);
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setEmailError(true);
            setMessage('Por favor, digite um email válido!');
            setOpenSnackbar(true);
            setLoading(false);
            return;
        }

        if (await validateEmailExistence(email)) {
            setMessage('Email já cadastrado!');
            setEmailError(true);
            setOpenSnackbar(true);
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem!');
            setPasswordError(true);
            setOpenSnackbar(true);
            setLoading(false);
            return;
        }

        const role = 'BASIC';
        const response = await Api.post('/users/', {
            name,
            surname,
            email,
            password,
            role
        });

        setSnackbarType('success');
        setSnackbarTitle('Sucesso');
        setMessage('Cadastro realizado com sucesso!');
        setOpenSnackbar(true);
        setLoading(false);
        response.status === 200 && navigate('/login');
    }

    useEffect(() => {
        if (passwordError || emailError) {
            setPasswordError(false);
            setEmailError(false);
        }
    }, [password, confirmPassword, email]);

    async function validateEmailExistence(email: string) {
        const response = await Api.get('/users');
        const users = response.data;

        // eslint-disable-next-line
        const user = users.find((user: any) => user.email === email);

        if (user) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                className={styles.container}
            >
                <Box
                    className={styles.card}
                >
                    {
                        !check ?
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ mb: 2 }}
                            >
                                <Logo style={{ width: '150px', height: '100px' }} />
                                <Typography variant='h5' sx={{ margin: '3% 0' }}>Formulário de Cadastro</Typography>
                                <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={4}
                                    sx={{ width: '60%' }}
                                >
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Nome"
                                            variant="standard"
                                            placeholder='Digite seu nome'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Sobrenome"
                                            variant="standard"
                                            placeholder='Digite seu sobrenome'
                                            value={surname}
                                            onChange={(e) => setSurname(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Email"
                                            variant="standard"
                                            placeholder='Digite seu email'
                                            error={emailError}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PasswordInput
                                            password={password}
                                            setPassword={setPassword}
                                            error={passwordError}
                                            label='Senha'
                                            placeholder='Digite sua senha'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PasswordInput
                                            password={confirmPassword}
                                            setPassword={setConfirmPassword}
                                            error={passwordError}
                                            label="Confirmar senha"
                                            placeholder='Confirme sua senha'
                                        />
                                    </Grid>
                                </Grid>
                                <ColorButton
                                    variant='contained'
                                    onClick={() => onClick()}
                                    sx={{ width: '50%', marginTop: '10%' }}
                                >
                                    Cadastrar
                                </ColorButton>
                                <Button
                                    color='inherit'
                                    sx={{ marginTop: '2%' }}
                                    onClick={() => navigate('/login')}
                                >
                                    Já possui uma conta? Clique aqui e faça o login
                                </Button>
                            </Stack>
                            :
                            <Termo />
                    }
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarType}
                >
                    <AlertTitle>{snackbarTitle}</AlertTitle>
                    <strong>{message}</strong>
                </Alert>
            </Snackbar>
        </>
    );
}
