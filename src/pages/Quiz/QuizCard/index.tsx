import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import * as image2 from "assets/quiz/Linux.png";

export default function CardQuiz({ image, category, difficulty }: { image: string | undefined, category: string, difficulty: string }) {
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
                        height: 300
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
                                        src={image}
                                        alt="Imagem da categoria"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '100%',
                                            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)'
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
        </>
    );
}