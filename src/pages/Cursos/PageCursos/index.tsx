import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Modal, Typography } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Title from "components/Title";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "api/api";
import { CircularProgress } from "@mui/material";
import { ColorButton } from "components/ColorButton";
import { getUserLocalStorage } from "context/AuthProvider/utils";

import { insignias } from "data/__insignias";

import { toast } from "react-toastify";


export default function PageCursos() {
    //eslint-disable-next-line
    const notify = (message: string, params: any) => toast(message, params);

    const { id } = useParams();

    const user = getUserLocalStorage();
    const [aulaAtiva, setAulaAtiva] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    // eslint-disable-next-line
    const [cursosAtivos, setCursosAtivos] = useState<any[]>([]);
    const [clicked, setClicked] = useState(false);
    const [curso, setCurso] = useState({
        id: 0,
        title: '',
        description: '',
        image: '',
        tipo: '',
    });

    const [message, setMessage] = useState('Clique aqui para se matricular e acompanhar seu progresso!');
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        getCurso();
        getCursosAtivos();
    }, []);

    async function getCurso() {
        const req = await Api.get('/cursos/' + id).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
        setCurso(req);
    }

    async function getCursosAtivos() {
        await Api.get('/cursos/ativos/' + user.id).then((response) => {
            setCursosAtivos(response.data);

            if (response.data.length > 0) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].curso_ativo == id) {
                        setMessage('Você já está matriculado neste curso!');
                        setDisabled(true);
                    }
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    async function handleMatricula() {
        const payload = {
            user_id: user.id,
            curso_ativo: curso.id,
            aula_ativa: 1
        };

        await Api.post('/cursos/ativos/', payload).then(() => {
            setMessage('Você já está matriculado neste curso!');
            notify('Matrícula realizada com sucesso!', { type: 'success' });
            setDisabled(true);
        }).catch((error) => {
            console.log(error);
            notify('Erro ao realizar matrícula!', { type: 'error' });
        });
    }

    async function patchMatricula(aula: number) {
        const payload = {
            user_id: user.id,
            curso_ativo: curso.id,
            aula_ativa: aula
        };
        setAulaAtiva(aula);

        await Api.post('/cursos/ativos/', payload).then(() => {
            aula === 5 ? notify('Parabéns por finalizar o curso!', { type: 'success' }) : notify(('Aula ' + payload.aula_ativa + ' iniciada!'), { type: 'success' });
        }).catch((error) => {
            console.log(error);
            notify('Erro ao realizar matrícula!', { type: 'error' });
        });

    }

    async function handleFinalizar() {
        patchMatricula(5);
        setOpenModal(true);
        handleInsignia();
    }

    async function handleInsignia() {
        const insignia = insignias[Math.floor(Math.random() * insignias.length)];

        const payload = {
            user_id: user.id,
            insignia_id: insignia.id,
            opened: false
        };

        await Api.post('/insignias/', payload).then(() => {
            notify('Insignia obtida!', { type: 'success' });
        }).catch((error) => {
            console.log(error);
            notify('Erro ao obter insignia!', { type: 'error' });
        });
    }


    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Title
                    title={curso.title}
                />
            </Box>
            <Grid
                container
                direction="row"
                spacing={2}
            >
                <Grid
                    item
                    xs={12} md={9}
                >
                    <Button
                        onClick={() => setClicked(!clicked)}
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            bgcolor: '#f5f5f5',
                            color: '#000',
                            borderRadius: '0',
                            '&:hover': {
                                bgcolor: '#f5f5f5',
                                color: '#000',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '750px',
                                bgcolor: '#000',
                                color: '#fff',
                                display: 'flex',
                            }}
                        >
                            <Box
                                sx={{
                                    margin: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {
                                    clicked ?
                                        <CircularProgress
                                            sx={{
                                                color: '#fff',
                                            }}
                                        />
                                        :
                                        <FaPlay
                                            size={50}
                                        />
                                }
                            </Box>
                        </Box>
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={12} md={3}
                >
                    <Box>
                        <ColorButton
                            disabled={disabled}
                            sx={{
                                width: '100%',
                                mb: 2
                            }}
                            onClick={handleMatricula}
                        >
                            {message}
                        </ColorButton>
                        <Accordion expanded={expanded === '1'} onChange={handleChange('1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 1
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Introdução</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                    onClick={() => patchMatricula(1)}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === '2'} onChange={handleChange('2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 2
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Sintaxe</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                    onClick={() => patchMatricula(2)}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === '3'} onChange={handleChange('3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 3
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Pandas</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                    onClick={() => patchMatricula(3)}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === '4'} onChange={handleChange('4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 4
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Numpy</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                    onClick={() => patchMatricula(4)}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        {
                            aulaAtiva === 4 ?
                                <Button
                                    variant="contained"
                                    onClick={() => handleFinalizar()}
                                >
                                    Finalizar curso
                                </Button>
                                :
                                null
                        }
                    </Box>
                </Grid>
            </Grid >
            <ModalFinalizar
                open={openModal}
            />
        </>
    );
}

function ModalFinalizar({ open }: { open: boolean }) {
    const navigate = useNavigate();

    return (
        <Modal
            open={open}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    Parabéns, você concluiu o curso e ganhou uma ínsignia!
                </Typography>
                <ColorButton
                    sx={{
                        width: '100%',
                        mt: 2,
                    }}
                    onClick={() => navigate('/profile')}
                >
                    Ir para o perfil e ver a ínsignia
                </ColorButton>
            </Box>
        </Modal>
    );
}