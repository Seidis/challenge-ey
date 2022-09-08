import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';

export default function Skills() {
    return (
        <Box>
            <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={2}
            >
                <Grid item xs={6}>
                    <Typography variant='h4' align='center' sx={{ mb: '10px' }}>
                        Soft Skills
                    </Typography>
                    <Autocomplete
                        multiple
                        id="soft-skills"
                        options={softSkills}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Escolha suas Soft Skills" />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h4' align='center' sx={{ mb: '10px' }}>
                        Hard Skills
                    </Typography>
                    <Autocomplete
                        multiple
                        id="Hard-skills"
                        options={hardSkills}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Escolha suas Hard Skills" />
                        )}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}

const softSkills = [
    { title: 'Responsabilidade' },
    { title: 'Trabalho em equipe' },
    { title: 'Comunicação' },
    { title: 'Criatividade' },
    { title: 'Liderança' },
    { title: 'Proatividade' },
    { title: 'Resiliência' },
    { title: 'Flexibilidade' },
    { title: 'Paciência' },
    { title: 'Empatia' },
    { title: 'Organização' },
    { title: 'Disciplina' },
    { title: 'Persistência' },
    { title: 'Respeito' },
    { title: 'Comprometimento' },
    { title: 'Pontualidade' },
    { title: 'Honestidade' },
    { title: 'Humildade' },
    { title: 'Autonomia' },
    { title: 'Iniciativa' },
    { title: 'Foco' },
];

const hardSkills = [
    { title: 'HTML' },
    { title: 'CSS' },
    { title: 'JavaScript' },
    { title: 'React' },
    { title: 'Node' },
    { title: 'Python' },
    { title: 'Java' },
    { title: 'C#' },
    { title: 'C++' },
    { title: 'C' },
    { title: 'PHP' },
    { title: 'SQL' },
    { title: 'NoSQL' },
    { title: 'MongoDB' },
    { title: 'MySQL' },
    { title: 'PostgreSQL' },
    { title: 'Git' },
    { title: 'GitHub' },
    { title: 'GitLab' },
    { title: 'Docker' },
    { title: 'Kubernetes' },
    { title: 'Linux' },
    { title: 'Windows' },
    { title: 'MacOS' },
    { title: 'Photoshop' },
    { title: 'Illustrator' },
    { title: 'InDesign' },
    { title: 'Premiere' },
    { title: 'After Effects' },
    { title: 'Figma' },
    { title: 'Adobe XD' },
    { title: 'Sketch' },
    { title: 'InVision' },
    { title: 'Zeplin' },
    { title: 'Adobe Analytics' },
    { title: 'Adobe Campaign' },
    { title: 'Adobe Experience Manager' },
    { title: 'Adobe Experience Platform' },
    { title: 'Adobe Target' }
];
