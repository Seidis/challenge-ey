import { useState } from 'react';
import Academic from './Academic';

import { Typography, Box, Button, Grid, Stack } from '@mui/material';
import Professional from './Professional';

export default function Experience() {

    const [qtdExpAcad, setQtdExpAcad] = useState(1);
    const [qtdExpProf, setQtdExpProf] = useState(1);

    return (
        <Box>
            <Grid container spacing={8}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" align='center'> Experiência Acadêmica </Typography>
                        {
                            [...Array(qtdExpAcad)].map((_, index) => (
                                <Academic
                                    key={index}
                                    nExp={index}
                                    qtdExp={qtdExpAcad}
                                    setQtdExp={setQtdExpAcad}
                                />
                            ))
                        }
                        <Button
                            variant="contained"
                            color='inherit'
                            sx={{ mt: 2, mr: 'auto', ml: 'auto', display: 'block' }}
                            onClick={() => setQtdExpAcad(qtdExpAcad + 1)}
                            fullWidth
                        >
                            Adicionar Experiência Acadêmica
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" align='center'> Experiência Profissional </Typography>
                        {
                            [...Array(qtdExpProf)].map((_, index) => (
                                <Professional
                                    key={index}
                                    nExp={index}
                                    qtdExp={qtdExpProf}
                                    setQtdExp={setQtdExpProf}
                                />
                            ))
                        }
                        <Button
                            variant="contained"
                            color='inherit'
                            sx={{ mt: 2, mr: 'auto', ml: 'auto', display: 'block' }}
                            onClick={() => setQtdExpProf(qtdExpProf + 1)}
                            fullWidth
                        >
                            Adicionar Experiência Profissional
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}