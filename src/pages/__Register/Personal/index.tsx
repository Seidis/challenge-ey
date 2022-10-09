import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Grid, Stack, TextField, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, ClickAwayListener, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


interface inputProps {
    name: string;
    birthDate: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    emailError: boolean;
    cpfError: boolean;
    phoneError: boolean;
    passwordError: boolean;
}

interface PersonalProps {
    valuesPersonal: inputProps
    handleChangePersonal: (prop: keyof inputProps) => (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Personal({ valuesPersonal, handleChangePersonal }: PersonalProps) {

    const { name, birthDate, email, password, cpf, phone, emailError, cpfError, phoneError, passwordError } = valuesPersonal;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [open, setOpen] = React.useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item sm={9}>
                    <TextField
                        id="name"
                        label="Nome Completo"
                        value={name}
                        onChange={handleChangePersonal('name')}
                        variant="outlined"
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        name="birth"
                        label="Data de Nascimento"
                        type="date"
                        value={birthDate}
                        onChange={handleChangePersonal('birthDate')}
                        InputLabelProps={{ shrink: true, required: true }}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={6}
                sx={{ mb: 2 }}
            >
                <InputMask
                    mask="(99) 99999-9999"
                    value={phone}
                    onChange={handleChangePersonal('phone')}
                >
                    <TextField
                        id="phone"
                        label="Telefone"
                        variant="outlined"
                        error={phoneError}
                        helperText={phoneError ? 'Telefone inválido' : ' '}
                        required
                        fullWidth
                    />
                </InputMask>
                <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={handleChangePersonal('cpf')}
                >
                    <TextField
                        id="CPF"
                        label="CPF"
                        variant="outlined"
                        error={cpfError}
                        helperText={cpfError ? 'CPF inválido' : ' '}
                        required
                        fullWidth
                    />
                </InputMask>
            </Stack>
            <Grid container spacing={6}>
                <Grid item sm={8}>
                    <TextField
                        id="email"
                        label="Email"
                        value={email}
                        onChange={handleChangePersonal('email')}
                        variant="outlined"
                        error={emailError}
                        helperText={emailError ? 'Email inválido' : ''}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                </Grid>
                <Grid item sm={4}>
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={TooltipText}
                                placement="bottom-start"
                            >
                                <FormControl variant="outlined" fullWidth onClick={handleTooltipOpen}>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        error={passwordError}
                                        onChange={handleChangePersonal('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />

                                </FormControl>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                </Grid>
            </Grid>
        </Box >
    );
}

const TooltipText =
    <div>
        <div> A senha deve conter:</div>
        <div>- Ao menos 8 caracteres</div>
        <div>- 1 letra maiúscula</div>
        <div>- 1 letra minúscula</div>
        <div>- 1 número</div>
        <div>- 1 caractere especial</div>
    </div>;