import { Avatar, Box, Button, Grid } from "@mui/material";
import Title from "components/Title";
import icon from 'assets/batman_icon.png';

import DadosPessoais from "./DadosPessoais";

export default function Profile() {

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