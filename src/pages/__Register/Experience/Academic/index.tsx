import { useState } from 'react';
import { degreeOptions } from '../__options';

import { Autocomplete, TextField, Typography, Box, Stack, IconButton, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Academic({ nExp, qtdExp, setQtdExp }: { nExp: number, qtdExp: number, setQtdExp: React.Dispatch<React.SetStateAction<number>> }) {

    const [remove, setRemove] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);

    function handleCurrent() {
        setIsCurrent(!isCurrent);
    }

    if (remove) {
        setQtdExp(qtdExp - 1);
        return (
            null
        );
    }

    return (
        <Box sx={{ mt: 1 }}>
            <Typography
                variant='subtitle2'
                sx={{ mt: nExp !== 0 ? 2 : 0 }}
            >
                Experiência Acadêmica {nExp + 1}
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox key={nExp} defaultChecked={false} onChange={handleCurrent} />} label="Cursando" />
            </FormGroup>
            {
                qtdExp > 1 && nExp > 0 &&
                <IconButton aria-label="delete" size="large" onClick={() => setRemove(true)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            }
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={degreeOptions.sort((a, b) => -b.label.localeCompare(a.label))}
                sx={{ mb: 1 }}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Grau Acadêmico" />}
            />
            <TextField
                id="escola"
                label="Instituição de Ensino"
                sx={{ mb: 2 }}
                fullWidth
            />
            <Stack
                direction="row"
                justifyContent='space-between'
                alignItems='center'
            >
                <TextField
                    name="start_date"
                    label="Data de Início"
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                />
                {
                    !isCurrent ?
                        <TextField
                            name="end_date"
                            label="Data de Conclusão"
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                        /> :
                        ''
                }
            </Stack>
        </Box>
    );
}