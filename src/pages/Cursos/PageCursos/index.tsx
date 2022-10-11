import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Title from "components/Title";
import { useParams } from "react-router-dom";
import { Api } from "api/api";

export default function PageCursos() {
    const { id } = useParams();
    const [curso, setCurso] = useState({
        id: 0,
        title: '',
        description: '',
        image: '',
        tipo: '',
    });


    useEffect(() => {
        getCurso();
    }, []);

    async function getCurso() {
        const req = await Api.get('/cursos/' + id).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
        setCurso(req);
    }

    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Title
                    title={curso.title}
                />
            </Box>
            <Grid
                container
                direction="row"
                spacing={2}
            >
                <Grid
                    item
                    xs={12} md={9}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '750px',
                            bgcolor: '#000',
                            color: '#fff',
                            display: 'flex',
                        }}
                    >
                        <Box
                            sx={{
                                margin: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <FaPlay
                                size={50}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12} md={3}
                >
                    <Box>
                        <Accordion expanded={expanded === '1'} onChange={handleChange('1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 1
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Introdução</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === '2'} onChange={handleChange('2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 2
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Sintaxe</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === '3'} onChange={handleChange('3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 3
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Pandas</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === '4'} onChange={handleChange('4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Aula 4
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Numpy</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: '65%',
                                    }}
                                >
                                    Assistir
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}