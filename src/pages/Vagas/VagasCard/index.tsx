// eslint-disable-next-line
import { Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";

import { Stack, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VagasProps } from "../__types";

// eslint-disable-next-line
export default function VagasCard({ id, image, title, short_description, description, salary, location, type, level, expire_date, loading }: VagasProps) {

    const navigate = useNavigate();


    return (
        <>
            {loading ?
                (
                    <CardSkeleton />
                )
                :
                (
                    <Card sx={{ maxWidth: 345, height: 300 }}>
                        <CardActionArea
                            onClick={() => navigate('/vagas/' + id)}
                        >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {short_description}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent='space-between'
                                    alignItems='center'
                                    sx={{
                                        marginTop: 4
                                    }}
                                    spacing={1}
                                >
                                    <Chip
                                        label={type}
                                        variant="outlined"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <Chip
                                        label={level}
                                        variant="outlined"
                                    />
                                </Stack>
                                <Typography variant="body1" color="text" align="center" sx={{
                                    marginTop: 4
                                }}>
                                    Clique para mais informa????es
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            }
        </>
    );
}

function CardSkeleton() {
    return (
        <Stack>
            <Skeleton variant="rounded" width={345} height={140} />
            <Skeleton variant="rectangular" height={30} width={250} sx={{
                marginTop: 2,
                marginLeft: 2,
            }} />
            <Skeleton variant="rectangular" width={310} sx={{
                marginTop: 1.5,
                marginLeft: 2,
            }} />
            <Skeleton variant="rectangular" width={310} sx={{
                marginTop: 0.5,
                marginLeft: 2,
            }} />
            <Skeleton variant="rectangular" width={310} sx={{
                marginTop: 0.5,
                marginLeft: 2,
            }} />
            <Skeleton variant="rectangular" width={310} sx={{
                marginTop: 0.5,
                marginLeft: 2,
            }} />
            <Skeleton variant="rectangular" width={310} sx={{
                marginTop: 0.5,
                marginLeft: 2,
            }} />
            <Skeleton variant="rectangular" width={180} sx={{
                margin: '20px auto',
            }} />
        </Stack>
    );

}