import { Box, Button, Stack, Typography } from "@mui/material";
import { Api } from "api/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { TbArrowBack } from 'react-icons/tb';
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
        salary: '',
        location: '',
        type: '',
        level: ''
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
        navigate('/vagas/' + id + '/edit');
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
                        {console.log('aqui')}
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
                    <Box>
                        <Title title={vaga.title} />
                        <Typography
                            variant="h6"
                            sx={{
                                marginTop: '4%',
                                marginLeft: '8%'
                            }}

                        >
                            {vaga.description}
                        </Typography>
                    </Box>
                </>
            );
        }
    }
}