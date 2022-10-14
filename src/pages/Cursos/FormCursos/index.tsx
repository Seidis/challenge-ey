import { Autocomplete, Backdrop, Box, Button, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cursos } from "../__types";
import Title from "components/Title";
import { Api } from "api/api";
import { types } from '../__options';

import { toast } from 'react-toastify';

export default function FormCurso() {

    // eslint-disable-next-line
    const notify = (message: string, params: any) => toast(message, params);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [curso, setCurso] = useState<Cursos>({
        id: 0,
        title: '',
        description: '',
        image: '',
        tipo: '',
    });

    async function handleSubmit() {
        setLoading(true);
        await Api.post('/cursos', curso).then((response) => {
            navigate('/cursos');
            console.log(response);
            setLoading(false);
            notify('Curso cadastrado com sucesso!', { type: 'success' });
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
            notify('Houve um erro, tente novamente mais tarde!', { type: 'error' });
        });
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex'
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}
                        sx={{
                            margin: '0 4%'
                        }}
                    >
                        <Title
                            title="Formulário de Cursos"
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        direction="row"
                        spacing={2}
                        sx={{
                            margin: '0 4%',
                        }}
                    >
                        <Grid
                            item
                            xs={12} md={6}
                        >
                            <Stack
                                direction="column"
                                spacing={3}
                            >
                                <TextField
                                    label="Nome do Curso"
                                    variant="outlined"
                                    value={curso.title}
                                    onChange={(e) => setCurso({ ...curso, title: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="URL da Imagem"
                                    variant="outlined"
                                    value={curso.image}
                                    onChange={(e) => setCurso({ ...curso, image: e.target.value })}
                                    autoComplete="off"
                                    fullWidth
                                />
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={types}
                                    onChange={(event, newValue) => {
                                        setCurso({ ...curso, tipo: newValue ? newValue : '' });
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} label="Área de Atuação" variant="outlined" />}
                                />

                            </Stack>
                        </Grid>
                        <Grid
                            item
                            xs={12} md={6}
                        >
                            <TextField
                                label="Descrição do curso"
                                variant="outlined"
                                value={curso.description}
                                onChange={(e) => setCurso({ ...curso, description: e.target.value })}
                                multiline
                                rows={8}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box >
            <Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={4}
                    sx={{
                        padding: '2rem 5rem 1rem',
                    }}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        {'Criar Curso'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            navigate('/cursos');
                        }}
                    >
                        Cancelar
                    </Button>
                </Stack>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </>
    );
}
