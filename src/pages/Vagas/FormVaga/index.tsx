import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "api/api";
import { Vagas } from "../__types";

import { Box, TextField } from "@mui/material";
import Title from "components/Title";

export default function FormVaga() {

    const { id } = useParams();

    const [error, setError] = useState(false);
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



    async function getVaga() {
        const req = await Api.get('/vagas/' + id).then((response) => {
            return response.data;
        }).catch((erro) => {
            console.log(erro);
            console.log(error);
            setError(true);
        });
        setVaga(req);
    }

    useEffect(() => {
        id && getVaga();
        console.log(id);
    }, []);

    return (
        <Box>
            <Title title="Formulário de Vagas" />
            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                value={vaga.title}
                onChange={(e) => setVaga({ ...vaga, title: e.target.value })}
            />
        </Box>
    );
}