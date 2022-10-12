import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";


export default function CardQuiz({ category, difficulty }: { category: string, difficulty: string }) {
    const navigate = useNavigate();


    return (
        <>
            <CardActionArea
                onClick={() => {
                    navigate('/quiz/' + category + '/' + difficulty);
                }}
            >
                <Card
                    sx={{
                        borderRadius: 5,
                        boxShadow: 2,
                        height: 400
                    }}
                >
                    <Grid
                        container
                        direction="row"
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <CardMedia>
                                <Box
                                    sx={{
                                        height: 180,
                                        maxWidth: 180,
                                        margin: 'auto',
                                        marginTop: 2
                                    }}
                                >
                                    <img
                                        src="https://source.unsplash.com/random"
                                        alt="Imagem do candidato"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '100%'
                                        }}
                                    />
                                </Box>
                            </CardMedia>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    marginTop: 2
                                }}
                            >
                                {category}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    textAlign: 'center'
                                }}
                            >
                                {difficulty}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </CardActionArea>
            <script src="https://www.socialintents.com/api/socialintents.1.3.js#2c9fab3583b596a00183cd58cb2d11a5" async={true}></script>
        </>
    );
}