import React from 'react';
import { useState } from 'react';
import { validateCPF, validatePhone } from 'utils/__utils';
import styles from './Register.module.scss';
import { ReactComponent as Logo } from 'assets/ey_text.svg';

import Personal from './Personal';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const steps = ['Dados Pessoais', 'Dados Profissionais', 'Dados de Acesso'];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ButtonBack({ activeStep, handleBack }: any) {
    return (
        <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
        >
            Voltar
        </Button>
    );
}

export default function Register() {

    // Stepper
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        if (validateCPF(cpf) && validatePhone(phone)) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setOpenSnackbar(true);
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    // Dados Pessoais
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.auth_logo}>
                    <Logo style={{ width: '150px', height: '100px' }} />
                </div>
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
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Última página do stepper */}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <ButtonBack
                                activeStep={activeStep}
                                handleBack={handleBack}
                            />
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box>
                            {/* Conteúdo da página */}
                            {activeStep === 0 && <Personal
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                cpf={cpf}
                                setCpf={setCpf}
                                phone={phone}
                                setPhone={setPhone}
                            />}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <ButtonBack
                                activeStep={activeStep}
                                handleBack={handleBack}
                            />
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
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
                            {!validateCPF(cpf) ? 'CPF ' : ''}
                            {!validateCPF(cpf) && !validatePhone(phone) ? 'e ' : ''}
                            {!validatePhone(phone) ? 'Telefone ' : ''}
                            {!validateCPF(cpf) && !validatePhone(phone) ? 'inválidos!' : 'inválido!'}
                        </Alert>
                    </Snackbar>
                }
            </div>
        </div >
    );
}