import { Container, Box, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';

export default function NotLogged() {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                minWidth: '100vw',
                background: 'radial-gradient(78.25% 78.25% at 70.31% 21.75%, #36343e 0, #0a090c 90.62%)'
            }}
        >
            <Container
                sx={{
                    justifyContent: 'center',
                    height: '50vh',
                    width: '70vh',
                    margin: 'auto',
                    background: '#fff',
                    borderRadius: '10px',
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <ReportIcon
                            sx={{
                                fontSize: '10rem',
                                color: '#a83232',
                                margin: 'auto',
                                display: 'block',
                            }}
                        />
                        <Typography
                            variant='h4'
                            sx={{
                                textAlign: 'center',
                                color: '#000000',
                            }}
                        >
                            Você não está logado!
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            marginTop: '6rem',
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{
                                textAlign: 'center',
                                color: '#000000',
                            }}
                        >
                            Clique no botão e faça login para acessar o sistema.
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={() => navigate('/login')}
                            sx={{
                                display: 'block',
                                margin: 'auto',
                                marginTop: '2rem',
                            }}
                            color='inherit'
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    textAlign: 'center',
                                    color: '#000000',
                                }}
                            >
                                Efetuar Login
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}