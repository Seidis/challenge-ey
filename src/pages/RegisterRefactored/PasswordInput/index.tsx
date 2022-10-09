import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';

interface PasswordInputProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>
    label: string;
    placeholder: string;
    error: boolean;
}

export default function PasswordInput({ password, setPassword, label, placeholder, error }: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel>{label}</InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={placeholder}
                error={error}
                required
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}