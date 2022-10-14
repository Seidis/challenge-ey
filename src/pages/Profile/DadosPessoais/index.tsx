import { useEffect, useState } from "react";
import { Api } from 'api/api';

import { Button, Grid, TextField } from "@mui/material";
import Title from "components/Title";

import { getUserLocalStorage } from "context/AuthProvider/utils";
import { Stack } from "@mui/system";

export default function DadosPessoais() {

    const user = getUserLocalStorage();
    useEffect(() => {
        getUserData(user.id);
    }, []);
    const [cpfDisabled, setCpfDisabled] = useState(false);

    async function getUserData(id: string) {
        const request = await Api.get('/users/all/' + id).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });

        setDadosPessoais({
            ...dadosPessoais,
            name: request.name,
            surname: request.surname,
            email: request.email,
            nome_social: request?.nome_social,
            cpf: request?.cpf,
            telefone: request?.telefone,
            data_nascimento: request?.data_nascimento
        });

        if (request?.cpf) {
            setCpfDisabled(true);
        }
    }

    const [dadosPessoais, setDadosPessoais] = useState({
        name: '',
        surname: '',
        nome_social: '',
        email: '',
        cpf: '',
        telefone: '',
        data_nascimento: ''
    });

    async function handleSubmit() {
        const existe = await Api.get('/users_personal/' + user.id).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });

        if (existe) {
            await Api({
                method: 'patch',
                url: '/users_personal/update/' + user.id,
                data: {
                    nome_social: dadosPessoais.nome_social,
                    telefone: dadosPessoais.telefone,
                    data_nascimento: dadosPessoais.data_nascimento
                }
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error);
            });
        } else {
            await Api.post('/users_personal/create/', {
                user_id: user.id,
                nome_social: dadosPessoais.nome_social,
                telefone: dadosPessoais.telefone,
                data_nascimento: dadosPessoais.data_nascimento,
                cpf: dadosPessoais.cpf
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <>
            <Title
                title="Dados Pessoais"
            />
            <Grid
                container
                direction="row"
                spacing={2}
                sx={{
                    marginTop: '1rem',
                    ml: '5%'
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                >
                    <TextField
                        label="Nome"
                        variant="outlined"
                        value={dadosPessoais.name + ' ' + dadosPessoais.surname}
                        disabled
                        fullWidth
                        sx={{
                            marginBottom: '1rem',
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                >
                    <TextField
                        label="Nome Social"
                        variant="outlined"
                        value={dadosPessoais.nome_social}
                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, nome_social: e.target.value })}
                        fullWidth
                        sx={{
                            marginBottom: '1rem',
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={dadosPessoais.email}
                        disabled
                        fullWidth
                        sx={{
                            marginBottom: '1rem',
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                >
                    <TextField
                        label="Telefone"
                        variant="outlined"
                        value={dadosPessoais.telefone}
                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, telefone: e.target.value })}
                        fullWidth
                        sx={{
                            marginBottom: '1rem',
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                >
                    <TextField
                        label="CPF"
                        variant="outlined"
                        value={dadosPessoais.cpf}
                        disabled={cpfDisabled}
                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, cpf: e.target.value })}
                        fullWidth
                        sx={{
                            marginBottom: '1rem',
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                >
                    <TextField
                        label="Data de Nascimento"
                        variant="outlined"
                        value={dadosPessoais.data_nascimento}
                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, data_nascimento: e.target.value })}
                        fullWidth
                        sx={{
                            marginBottom: '1rem',
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <Stack
                        direction="row"
                        alignContent="flex-end"
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                marginBottom: '1rem',
                            }}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Salvar
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

        </>
    );
}