import { Backdrop, Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import axios from "axios";
import Title from "components/Title";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaPlay } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb";
import CircularProgress from '@mui/material/CircularProgress';

export default function QuizPage() {

    const { category, difficulty } = useParams();

    //eslint-disable-next-line
    const [req, setReq] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [start, setStart] = useState(false);

    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    async function getQuiz() {
        setLoading(true);
        await axios.get(process.env.REACT_APP_QUIZ_URL + '&category=' + category + '&difficulty=' + difficulty + '&limit=1').then(async (response) => {
            if (response.data.multiple_correct_answers) {
                getQuiz();
            }
            setReq(response.data);
            setLoading(false);
            console.log(response.data);
        });
    }

    function restartQuiz() {
        setIndex(0);
        setCorrect(0);
        setStart(false);
        setOpenModal(false);
        getQuiz();
    }

    // eslint-disable-next-line
    function checkAnswer(answer: any) {
        if (index < 9) {
            if (answer === req[0].correct_answer) {
                setCorrect(correct + 1);
                setIndex(index + 1);
                console.log(index);
                getQuiz();
            } else {
                setIndex(index + 1);
                console.log('errou');
                console.log(req[0].correct_answer);
                getQuiz();
            }
        } else {
            setOpenModal(true);
        }
    }

    const answersStyle = {
        borderRadius: 5,
        boxShadow: 2,
        height: 80
    };

    const variant = "outlined";


    return (
        <>
            <Title
                title={"Quiz " + category + " - " + difficulty}
            />
            {
                start ? (
                    !loading ? (
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                            }}

                        >
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    mb: 2
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: 'center'
                                    }}
                                >
                                    {index + 1} - {req[0].question}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                spacing={6}
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid
                                    item
                                    alignSelf="center"
                                    xs={4}
                                >
                                    <Button
                                        variant={variant}
                                        color="success"
                                        fullWidth
                                        sx={answersStyle}
                                        onClick={() => checkAnswer('answer_a')}
                                    >
                                        {req[0].answers.answer_a}
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    alignSelf="center"
                                    xs={4}
                                >
                                    <Button
                                        fullWidth
                                        variant={variant}
                                        color="success"
                                        sx={answersStyle}
                                        onClick={() => checkAnswer('answer_b')}
                                    >
                                        {req[0].answers.answer_b}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                spacing={6}
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid
                                    item
                                    alignSelf="center"
                                    xs={4}
                                >
                                    <Button
                                        variant={variant}
                                        color="success"
                                        fullWidth
                                        sx={answersStyle}
                                        onClick={() => checkAnswer('answer_c')}
                                    >
                                        {req[0].answers.answer_c}
                                    </Button>
                                </Grid>
                                {
                                    req[0].answers.answer_d ? (
                                        <Grid
                                            item
                                            alignSelf="center"
                                            xs={4}
                                        >
                                            <Button
                                                fullWidth
                                                variant={variant}
                                                color="success"
                                                sx={answersStyle}
                                                onClick={() => checkAnswer('answer_d')}
                                            >
                                                {req[0].answers.answer_d}
                                            </Button>
                                        </Grid>
                                    ) : null
                                }
                            </Grid>
                            {
                                (req[0].answers.answer_e || req[0].answers.answer_f) ? (
                                    <Grid
                                        item
                                        container
                                        xs={12}
                                        spacing={6}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid
                                            item
                                            alignSelf="center"
                                            xs={4}
                                        >
                                            <Button
                                                variant={variant}
                                                color="success"
                                                fullWidth
                                                sx={answersStyle}
                                                onClick={() => checkAnswer('answer_e')}
                                            >
                                                {req[0].answers.answer_e}
                                            </Button>
                                        </Grid>
                                        {
                                            req[0].answers.answer_f ? (
                                                <Grid
                                                    item
                                                    alignSelf="center"
                                                    xs={4}
                                                >
                                                    <Button
                                                        fullWidth
                                                        variant={variant}
                                                        color="success"
                                                        sx={answersStyle}
                                                        onClick={() => checkAnswer('answer_f')}
                                                    >
                                                        {req[0].answers.answer_f}
                                                    </Button>
                                                </Grid>
                                            ) : null
                                        }
                                    </Grid>
                                ) : null
                            }
                        </Grid>
                    ) : (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )
                ) : (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                marginTop: 8
                            }}
                        >
                            {'O quiz consiste em 10 perguntas sobre ' + category + ', boa sorte!'}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ mt: 10, mb: 10 }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<FaPlay />}
                                onClick={() => {
                                    getQuiz();
                                    setStart(true);
                                    setLoading(true);
                                }}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    Começar
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<TbArrowBack />}
                                onClick={() => window.history.back()}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    Voltar
                                </Typography>
                            </Button>
                        </Stack>
                    </>
                )
            }
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        bgcolor: 'background.paper',
                        borderRadius: '30px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            marginBottom: 4
                        }}
                    >
                        {'Fim do Quiz sobre ' + category}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            marginBottom: 4
                        }}
                    >
                        {'Você acertou ' + correct + (correct === 1 ? ' questão' : ' questões') + '!'}
                    </Typography>
                    {
                        correct > 7 ? (
                            <>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        textAlign: 'center',
                                        marginBottom: 4
                                    }}
                                >
                                    {'Parabéns, você sabe bastante sobre ' + category + ', como recompensa você ganhou uma de nossas insígnias!'}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Button
                                        onClick={() => navigate('/profile')}
                                    >
                                        <Typography
                                            variant="h5"
                                        >
                                            Ir para o perfil para ver a insígnia
                                        </Typography>
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/quiz')}
                                    >
                                        <Typography
                                            variant="h5"
                                        >
                                            Voltar para jogar mais!
                                        </Typography>
                                    </Button>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        textAlign: 'center',
                                        marginBottom: 4
                                    }}
                                >
                                    {'Infelizmente você não acertou o suficiente para ganhar a ínsignia, mas que tal dar uma olhada em nossos cursos sobre ' + category + ' e tentar novamente mais tarde!'}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Button
                                        onClick={() => restartQuiz()}
                                    >
                                        <Typography
                                            variant="h5"
                                        >
                                            Tentar novamente
                                        </Typography>
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/cursos')}
                                    >
                                        <Typography
                                            variant="h5"
                                        >
                                            Ir para abas de cursos
                                        </Typography>
                                    </Button>
                                </Stack>
                            </>
                        )
                    }
                </Box>
            </Modal>
        </>
    );
}
