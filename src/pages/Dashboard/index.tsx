import { useEffect, useState } from 'react';
import { Api } from 'api/api';
import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import Title from 'components/Title';
import 'react-toastify/dist/ReactToastify.css';
import { getUserLocalStorage } from 'context/AuthProvider/utils';

import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CursoAtivo {
    id: number;
    user_id: number;
    curso_ativo: number;
    aula_ativa: number;
    id_curso: number;
    title: string;
    tipo: string;

}

export default function Dashboard() {

    const user = getUserLocalStorage();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [cursoAtivo, setCursoAtivo] = useState<CursoAtivo>();

    const [qtdAulas, setQtdAulas] = useState(0);


    async function getCursoAtivo() {
        setLoading(true);
        await Api.get('/cursos/last_ativo/' + user.id).then((response) => {
            setCursoAtivo(response.data);
            setQtdAulas(response.data ? (((response.data.aula_ativa - 1) * 100) / 4) : 0);
            return response.data;
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }


    useEffect(() => {
        getCursoAtivo();
    }, []);

    return (
        <>
            <Title
                title="Home"
            />
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    marginTop: '20px',
                }}
            >
                <Grid
                    container
                    direction="row"
                    spacing={2}
                >
                    <Grid
                        item
                        xs={6} md={6}
                    >
                        <CardActionArea
                            onClick={() => navigate('/cursos/' + cursoAtivo?.id_curso)}
                            disabled={!cursoAtivo}
                        >
                            <Card>
                                <Title
                                    title="Curso em Andamento"
                                />
                                {
                                    !loading ? (
                                        cursoAtivo ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    component="div"
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                    {cursoAtivo.title}
                                                </Typography>
                                                <CircularProgress
                                                    variant="determinate"
                                                    value={qtdAulas}
                                                    size={200}
                                                    sx={{
                                                        color: '#3f51b5',
                                                        marginTop: '20px',
                                                    }}
                                                />
                                                <Typography
                                                    variant="h5"
                                                    component="div"
                                                >
                                                    Aulas assistidas: {cursoAtivo.aula_ativa - 1} de 4
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: 300,
                                                }}
                                            >
                                                Você não possui nenhum curso em andamento
                                            </Typography>
                                        )
                                    ) : (
                                        <CircularProgress />
                                    )
                                }
                            </Card>
                        </CardActionArea>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}