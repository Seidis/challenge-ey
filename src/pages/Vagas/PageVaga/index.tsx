import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Api } from "api/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { TbArrowBack } from 'react-icons/tb';
import { IoRocketSharp } from "react-icons/io5";
import { ReactComponent as NotFoundSVG } from 'assets/not_found.svg';
import Title from "components/Title";
import { Vagas } from "../__types";


export default function PageVaga() {
    const navigate = useNavigate();
    const [vaga, setVaga] = useState<Vagas>({
        id: 0,
        image: '',
        title: '',
        short_description: '',
        description: '',
        salary: 0,
        city: '',
        state: '',
        type: '',
        level: '',
        expire_date: '',
        tecnical: false,
        personal: false,
        group_event: false,
        first_interview: false,
        final_interview: false,
        tecnical_date: '',
        personal_date: '',
        group_date: '',
        first_interview_date: '',
        final_interview_date: '',
    });
    const [error, setError] = useState(false);

    const user = JSON.parse(window.localStorage?.getItem('id') || '{}');

    const { id } = useParams();

    async function getVaga() {
        const req = await Api.get('/vagas/' + id).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            setError(true);
        });
        setVaga(req);
    }

    function onClickEdit() {
        navigate('/vagas/form/' + id);
    }

    function handleCandidatar() {
        Api.post('/candidatura', {
            candidate_id: user.id,
            job_id: vaga.id,
        }).then((response) => {
            console.log(response);
            navigate('/dashboard');
        }).catch((error) => {
            console.log(error);
            navigate('/vagas');
        });
    }


    useEffect(() => {
        getVaga();
    }, []);

    {
        if (error) {
            return (
                <Box>
                    <>
                        <NotFoundSVG
                            style={{
                                width: '85%',
                                height: 'auto',
                                display: 'block',
                                margin: 'auto',
                                marginTop: '5%'
                            }}
                        />
                    </>
                </Box>
            );
        } else {
            return (
                <>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<TbArrowBack />}
                            onClick={() => window.history.back()}
                            color='inherit'
                        >
                            Voltar
                        </Button>
                        {
                            user.role === 'ADMIN' &&
                            <Button
                                variant="outlined"
                                startIcon={<FaEdit />}
                                color='inherit'
                                onClick={() => onClickEdit()}
                            >
                                Editar
                            </Button>
                        }
                    </Stack>
                    <Title title={vaga.title} />
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            px: '7%'
                        }}
                    >
                        <Grid item xs={12} md={12}>
                            <Typography
                                variant="h6"
                            >
                                {vaga.description}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    marginTop: '2rem'
                                }}
                            >
                                {vaga.type} - {vaga.level}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    marginTop: '2rem'
                                }}
                            >
                                Sálario: R$ {vaga.salary}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    marginTop: '2rem'
                                }}
                            >
                                {vaga.city} - {vaga.state}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<IoRocketSharp />}
                            onClick={() => handleCandidatar()}
                            color='success'
                        >
                            Quero me candidatar
                        </Button>
                    </Stack>
                </>
            );
        }
    }
}