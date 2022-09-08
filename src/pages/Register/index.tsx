import { forwardRef, Fragment, useState } from 'react';
import { validateCPF, validateEmail, validatePassword, validatePhone } from 'utils/__utils';
import styles from './Register.module.scss';
import { ReactComponent as Logo } from 'assets/ey_text.svg';
import { useNavigate } from 'react-router-dom';

import { firebaseApp } from 'data/__firebase';
import { collection, addDoc, getFirestore, getDocs } from 'firebase/firestore';

import { Stepper, Step, StepLabel, Typography, Box, Button, Snackbar, AlertTitle, Stack, Grid, Backdrop, CircularProgress } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import Personal from './Personal';
import Experience from './Experience';
import Skills from './Skills';

export default function Register() {
    const navigate = useNavigate();

    /*-------------------Cadastro-------------------- */
    const db = getFirestore(firebaseApp);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(true);

    const [text, setText] = useState('');

    const verifyEmail = async (email: string) => {
        const users = await getDocs(collection(db, 'users'));
        const emails = users.docs.map(doc => doc.data().email);
        return !emails.includes(email);
    };

    const handleAdd = async () => {
        setLoading(true);
        const addUser = async (user: any) => {
            try {
                const docRef = await addDoc(collection(db, 'users'), user);
                console.log('Document written with ID: ', docRef.id);
            } catch (e) {
                console.error('Error adding document: ', e);
                setSuccess(false);
            } finally {
                setLoading(false);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        };
        const payload = {
            name: valuesPersonal.name,
            birthDate: valuesPersonal.birthDate,
            email: valuesPersonal.email,
            password: valuesPersonal.password,
            cpf: valuesPersonal.cpf,
            phone: valuesPersonal.phone,
            role: 'user'
        };

        if (await verifyEmail(payload.email)) {
            addUser(payload);
        } else {
            setSuccess(false);
            setLoading(false);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

            setText('Email já cadastrado!');
        }
    };
    /*-------------------End Cadastro-------------------- */


    /*-------------------Start Dados Pessoais-------------------- */
    const [valuesPersonal, setValuesPersonal] = useState({
        name: '',
        birthDate: '',
        email: '',
        password: '',
        cpf: '',
        phone: '',
        emailError: false,
        cpfError: false,
        phoneError: false,
        passwordError: false,
    });
    const handleChangePersonal = (prop: keyof typeof valuesPersonal) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesPersonal({ ...valuesPersonal, [prop]: event.target.value });
    };
    /*-------------------End Dados Pessoais-------------------- */


    /*-------------------Start Stepper-------------------- */
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        if (validateCPF(valuesPersonal.cpf) && validatePhone(valuesPersonal.phone) && validateEmail(valuesPersonal.email) && validatePassword(valuesPersonal.password)) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setOpenSnackbar(true);

            if (!validateEmail(valuesPersonal.email)) {
                setValuesPersonal({
                    ...valuesPersonal,
                    emailError: true,
                });
            }
            if (!validateCPF(valuesPersonal.cpf)) {
                setValuesPersonal({
                    ...valuesPersonal,
                    cpfError: true
                });
            }
            if (!validatePhone(valuesPersonal.phone)) {
                setValuesPersonal({
                    ...valuesPersonal,
                    phoneError: true
                });
            }
            if (!validatePassword(valuesPersonal.password)) {
                setValuesPersonal({
                    ...valuesPersonal,
                    passwordError: true
                });
            }

        }
        setValuesPersonal({
            ...valuesPersonal,
            emailError: false,
            cpfError: false,
            phoneError: false,
            passwordError: false,
        });
    };
    const handleNextDisabled = () => {
        if (valuesPersonal.name === '' || valuesPersonal.cpf === '' || valuesPersonal.phone === '' || valuesPersonal.email === '' || valuesPersonal.password === '') {
            return true;
        }
        return false;
    };
    const handleBack = () => {
        if (activeStep === 0 || activeStep === 3) {
            navigate('/');
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
    /*-------------------End Stepper-------------------- */

    /*-------------------Start Snackbar-------------------- */
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    /*-------------------End Snackbar-------------------- */

    return (
        <div className={styles.container}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={styles.card}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{ mb: 2 }}
                >
                    <Logo style={{ width: '150px', height: '100px' }} />
                </Stack>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant='h3' sx={{ mt: 5, mb: 5 }}>
                                {success ? 'Usuário cadastrado com sucesso!' : 'Erro ao cadastrar usuário!'}
                            </Typography>
                            {success ? <CheckCircleIcon sx={{ fontSize: '8rem', color: 'green' }} /> : <ErrorIcon sx={{ fontSize: '8rem', color: 'red' }} />}
                            {success ? '' : <Typography sx={{ mt: 2, mb: 2 }}> {text} </Typography>}
                        </Grid>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <ButtonBack
                                activeStep={activeStep}
                                handleBack={handleBack}
                            />
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Box sx={{ m: '5% 10%' }}>
                            {/* Conteúdo da página */}
                            {
                                activeStep === 0 &&
                                <Personal
                                    valuesPersonal={valuesPersonal}
                                    handleChangePersonal={handleChangePersonal}
                                />}

                            {
                                activeStep === 1 &&
                                <Experience

                                />
                            }
                            {
                                activeStep === 2 && <Skills />
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <ButtonBack
                                activeStep={activeStep}
                                handleBack={handleBack}
                            />
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep === steps.length - 1 ?
                                <Button
                                    onClick={handleAdd}
                                    disabled={handleNextDisabled()}
                                >
                                    Finalizar
                                </Button>
                                :
                                <Button
                                    onClick={handleNext}
                                    disabled={handleNextDisabled()}
                                >
                                    Próximo
                                </Button>
                            }
                        </Box>
                    </Fragment>
                )}
                {
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity="error"
                        >
                            <AlertTitle>Entrada Inválida!</AlertTitle>
                        </Alert>
                    </Snackbar>
                }
            </div>
        </div >
    );
}

const steps = ['Dados Pessoais', 'Experiências', 'Habilidades'];

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ButtonBackProps {
    activeStep: number,
    handleBack: () => void,
}

function ButtonBack({ activeStep, handleBack }: ButtonBackProps) {
    return (
        <Button
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 1 }}
        >
            {activeStep !== 3 ? 'Voltar' : 'Voltar para a página de login'}
        </Button>
    );
}