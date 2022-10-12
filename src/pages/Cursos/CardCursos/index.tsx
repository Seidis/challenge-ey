import { Card, CardActionArea, CardMedia, Chip, Grid, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CardCursosProps {
    id: number;
    image: string;
    title: string;
    description: string;
    tipo: string;
}

export default function CardCursos({ id, image, title, description, tipo }: CardCursosProps) {

    const navigate = useNavigate();

    return (

        <Card
            sx={{
                borderRadius: 2,
                boxShadow: 2,
                margin: '2% 5%',
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                height: '5%',
            }
            }
        >
            <CardActionArea
                onClick={() => navigate('/cursos/' + id)}
            >
                <Grid
                    container
                    justifyContent="center"
                >
                    <Grid
                        item
                        xs={12} md={2}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                width: '80%',
                                height: 'auto',
                            }}
                            image={image}
                            alt="random"
                        />
                    </Grid>
                    <Grid
                        item container
                        xs={12} md={8}
                        direction="column"
                    >
                        <Grid
                            item
                            xs={3.1} md={3.1}
                        >
                            <Typography variant="h5" component="h2">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={8.7} md={8.7}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12} md={2}
                    >
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{
                                height: '100%',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Área de atuação:
                            </Typography>
                            <Chip
                                label={tipo}
                                color="default"
                                variant="outlined"
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </CardActionArea >
        </Card >
    );
}