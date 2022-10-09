import { Box, TextField } from "@mui/material";
import { Api } from "api/api";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as NotFoundSVG } from 'assets/not_found.svg';
import { Vagas } from "../__types";


export default function EditVaga() {

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
                        {console.log(id)}
                    </>
                </Box>
            );
        } else {
            return (
                <Box>
                    <Title title="Editar de Vaga" />
                    <TextField
                        label="Título"
                        value={vaga.title}
                    />
                </Box>
            );
        }
    }
}