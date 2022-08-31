import InputMask from 'react-input-mask';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface InputProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    cpf: string;
    setCpf: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
}

export default function Personal({ name, setName, email, setEmail, cpf, setCpf, phone, setPhone }: InputProps) {

    return (
        <Box sx={{ m: '5% 10%' }}>
            <TextField
                id="name"
                label="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 4 }}
            />
            <TextField
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 4 }}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={6}
                sx={{ mb: 4 }}
            >
                <InputMask
                    mask="(99) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                >
                    <TextField
                        id="phone"
                        label="Telefone"
                        variant="outlined"
                        required
                        fullWidth
                    />
                </InputMask>
                <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                >
                    <TextField
                        id="CPF"
                        label="CPF"
                        variant="outlined"
                        required
                        fullWidth
                    />
                </InputMask>
            </Stack>
        </Box >
    );
}