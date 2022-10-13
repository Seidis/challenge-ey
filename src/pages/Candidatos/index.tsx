import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
import { Api } from "api/api";
import Title from "components/Title";
import { useEffect, useState } from "react";
import CardCandidato from "./CardCandidato";

import { Candidatos, Vagas } from "./__types";

export default function PageCandidatos() {
    const [vagas, setVagas] = useState<Vagas[]>([]);
    const [vagaSelected, setVagaSelected] = useState<Vagas | null>();

    const [candidatos, setCandidatos] = useState<Candidatos[]>([]);

    async function getVagas() {
        const request = await Api.get('/vagas/ativas').then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });

        setVagas(request);
    }

    async function getCandidates() {
        const candidates = await Api.get('/candidatura/candidates/' + vagaSelected?.id).then((response) => {
            setCandidatos(response.data);
            console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        getVagas();
    }, []);

    return (
        <>
            <Title
                title="Candidatos"
            />
            <>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{
                        mx: '5%',
                        my: '2%'
                    }}
                >
                    <Autocomplete
                        id="vagas"
                        options={vagas}
                        value={vagaSelected}
                        onChange={async (event, newValue) => {
                            setVagaSelected(newValue);
                            await getCandidates();
                        }}
                        getOptionLabel={(option: Vagas) => 'ID ' + option.id + ' - ' + option.title}
                        renderInput={(params) => <TextField {...params} label="Vagas" variant="outlined" />}
                        fullWidth
                    />
                </Stack>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    marginLeft='4%'
                    marginRight='4%'
                >
                    {
                        candidatos.map((candidato) => (
                            <Grid
                                item
                                key={candidato.id}
                                xs={12} sm={6} md={4} lg={4} xl={3}
                            >
                                <CardCandidato
                                    id={candidato.id}
                                    name={candidato.name}
                                    surname={candidato.surname}
                                    nome_social={candidato.nome_social}
                                    email={candidato.email}
                                    telefone={candidato.telefone}
                                    cpf={candidato.cpf}
                                    data_nascimento={candidato.data_nascimento}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </>
        </>
    );
}


