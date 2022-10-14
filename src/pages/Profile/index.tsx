import { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid } from "@mui/material";
import Title from "components/Title";
import icon from 'assets/batman_icon.png';

import DadosPessoais from "./DadosPessoais";
import { Api } from "api/api";
import { getUserLocalStorage } from "context/AuthProvider/utils";

export default function Profile() {

    const user = getUserLocalStorage();

    //eslint-disable-next-line
    const [dados, setDados] = useState<any>([]);

    //eslint-disable-next-line
    const [badges, setBadges] = useState<any>([]);

    async function handleModalInsignias() {
        await Api.get('/insignias/user/' + user.id).then((response) => {
            setDados(response.data);

            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].name);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        handleModalInsignias();
    }, []);

    return (
        <>
            <Title
                title="Editar Perfil"
            />
            <Grid
                container
                direction="row"
                spacing={2}
                sx={{
                    marginTop: '1rem',
                    ml: '5%',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={1.5}
                    lg={1.5}
                >
                    <Box
                        sx={{
                            borderRadius: '100%',
                            height: '200px',
                            width: '200px',
                        }}
                    >
                        <Avatar alt="Batman" src={icon} sx={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <Button
                        variant="text"
                        sx={{
                            width: '200px',
                            height: '50px',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            }
                        }}
                    >
                        Trocar Avatar
                    </Button>
                    {
                        dados.map((insignia: any) => (
                            <Box
                                key={insignia.id}
                                sx={{
                                    borderRadius: '100%',
                                    height: '50px',
                                    width: '50px',
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '1rem',
                                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                                }}
                            >
                                {insignia.badge}
                            </Box>
                        ))
                    }
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={9}
                    lg={9}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                    >
                        <DadosPessoais />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

function ModalInsignia(insignia: any, open: boolean, handleClose: any) {
    return (
        <Box>
            {insignia.badge}
        </Box>
    );
}