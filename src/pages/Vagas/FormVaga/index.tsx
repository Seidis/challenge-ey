import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "api/api";
import { Vagas } from "../__types";

import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Autocomplete, Backdrop, Box, Button, CircularProgress, Divider, Grid, TextField } from "@mui/material";
import Title from "components/Title";
import { Stack } from "@mui/system";

import { types, levels, state, cities, processo } from './__options';


export default function FormVaga() {

    const navigate = useNavigate();

    const [expire_date, setExpire_date] = useState<Dayjs | null>(dayjs());
    const [tecnical_date, setTecnical_date] = useState<Dayjs | null>(dayjs());
    const [personal_date, setPersonal_date] = useState<Dayjs | null>(dayjs());
    const [group_date, setGroup_date] = useState<Dayjs | null>(dayjs());
    const [first_interview_date, setFirst_interview_date] = useState<Dayjs | null>(dayjs());
    const [final_interview_date, setFinal_interview_date] = useState<Dayjs | null>(dayjs());

    const { id } = useParams();
    const [short_text, setShortText] = useState(200);
    const [description_text, setDescriptionText] = useState(1000);
    const [city, setCity] = useState<string[]>([]);
    const [vaga, setVaga] = useState<Vagas>({
        id: 0,
        image: 'None',
        title: '',
        short_description: '',
        description: '',
        salary: 0,
        city: '',
        state: '',
        type: '',
        level: '',
        expire_date: '',
        tecnical: false,
        personal: false,
        group_event: false,
        first_interview: false,
        final_interview: false,
        tecnical_date: undefined,
        personal_date: undefined,
        group_date: undefined,
        first_interview_date: undefined,
        final_interview_date: undefined,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        id && getVaga();
    }, []);

    function formatDate(date: Dayjs | null) {
        return date?.format('YYYY-MM-DD');
    }
    // useEffect(() => {
    //     setVaga({
    //         ...vaga, expire_date: date?.format('YYYY-MM-DD')
    //     });
    // }, []);

    useEffect(() => {
        setVaga({
            ...vaga, city: ''
        });
        cities.forEach((item) => {
            if (item.state === vaga.state) {
                setCity(item.cities);
            }
        });
    }, [vaga.state]);

    // eslint-disable-next-line
    function handleChange(e: any) {
        const { name, value } = e.target;
        setVaga({ ...vaga, [name]: value });

        if (name === 'short_description') {
            setShortText(200 - value.length);
        }
        if (name === 'description') {
            setDescriptionText(1000 - value.length);
        }
    }

    async function getVaga() {
        const req = await Api.get('/vagas/' + id).then((response) => {
            return response.data;
        }).catch((erro) => {
            console.log(erro);
        });
        setVaga(req);
        setExpire_date(req.expire_date ? dayjs(req.expire_date) : null);
    }

    async function getLastVaga() {
        const [allVagas, setAllVagas] = useState<Vagas[]>([]);
        const req = await Api.get('/vagas').then((response) => {
            setAllVagas(response.data);
            return response.data;
        }).catch((erro) => {
            console.log(erro);
        });
        return Number(req[req.length - 1].id);
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            if (id) {
                await Api.patch('/vagas/' + id, vaga).then(() => {
                    console.log('success');
                }).catch((erro) => {
                    console.log(erro);
                });
            } else {
                await Api({
                    method: 'POST',
                    url: '/vagas/create',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    data: {
                        "image_url": "None",
                        "title": vaga.title,
                        "short_description": vaga.short_description,
                        "description": vaga.description,
                        "salary": vaga.salary,
                        "city": vaga.city,
                        "state": vaga.state,
                        "type": vaga.type,
                        "level": vaga.level,
                        "is_active": true,
                        "expire_date": vaga.expire_date,
                        "tecnical": vaga.tecnical,
                        "personal": vaga.personal,
                        "group_event": vaga.group_event,
                        "first_interview": vaga.first_interview,
                        "final_interview": vaga.final_interview,
                        "tecnical_date": vaga.tecnical_date,
                        "personal_date": vaga.personal_date,
                        "group_date": vaga.group_date,
                        "first_interview_date": vaga.first_interview_date,
                        "final_interview_date": vaga.final_interview_date
                    }
                })
                    .then(() => {
                        console.log('success');
                    })
                    // eslint-disable-next-line
                    .catch((erro: any) => {
                        console.log(erro);
                    });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            console.log(JSON.stringify(vaga));
            // navigate('/vagas');
        }
    }

    return (
        <Box
            sx={{
                marginTop: '5%'
            }}
        >
            <Title title="Formulário de Vagas" />
            <Grid
                container
                spacing={2}
                sx={{
                    padding: '3rem 5rem 1rem',
                }}
            >
                <Grid item xs={12} md={6}>
                    <TextField
                        name="title"
                        label="Título"
                        variant="outlined"
                        fullWidth
                        value={vaga.title}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={types}
                        value={vaga.type}
                        onChange={(e, newValue) => {
                            setVaga({ ...vaga, type: newValue });
                        }}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Categoria" />}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={levels}
                        value={vaga.level}
                        onChange={(e, newValue) => {
                            setVaga({ ...vaga, level: newValue });
                        }}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Nível" />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="description"
                        label="Descrição completa"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={13}
                        value={vaga.description}
                        onChange={handleChange}
                        helperText={description_text + " caracteres restantes"}
                        sx={{
                            whiteSpace: 'pre-wrap'
                        }}
                    />
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    spacing={2}
                >
                    <Grid item xs={12} md={12}>
                        <TextField
                            name="short_description"
                            label="Descrição curta"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={vaga.short_description}
                            onChange={handleChange}
                            helperText={short_text + " caracteres restantes"}
                            sx={{
                                whiteSpace: 'pre-wrap'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={state}
                            value={vaga.state}
                            onChange={(e, newValue) => {
                                setVaga({ ...vaga, state: newValue });
                            }}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Estado" />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={city}
                            value={vaga.city}
                            onChange={(e, newValue) => {
                                setVaga({ ...vaga, city: newValue });
                            }}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Cidade" />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="salary"
                            label="Salário"
                            variant="outlined"
                            fullWidth
                            value={vaga.salary}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                renderInput={(props) => <TextField fullWidth {...props} />}
                                label="Data de expiração"
                                value={expire_date}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newValue) => {
                                    setExpire_date(newValue);
                                    setVaga({ ...vaga, expire_date: formatDate(newValue) });
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>
            <Title title="Etapas do Processo" />
            <Box>
                <Grid
                    container
                    direction="row"
                    sx={{
                        padding: '3rem 5rem 0',
                    }}
                >
                    <Grid item xs={selectGrid.xs} md={selectGrid.md}>
                        <Stack
                            direction="column"
                            spacing={2}
                        >
                            <Autocomplete
                                disablePortal
                                id="Análise Técnica"
                                options={processo}
                                value={vaga.tecnical ? processo[0] : processo[1]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, newValue) => {
                                    setVaga({ ...vaga, tecnical: newValue?.value });
                                }}
                                renderInput={(params) => <TextField {...params} label="Análise Técnica" />}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    label="Data de finalização da etapa"
                                    value={tecnical_date}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setTecnical_date(newValue);
                                        setVaga({ ...vaga, tecnical_date: formatDate(newValue) });
                                    }}
                                    disabled={!vaga.tecnical}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            margin: '0 1%',
                        }}
                    />
                    <Grid item xs={selectGrid.xs} md={selectGrid.md}>
                        <Stack
                            direction="column"
                            spacing={2}
                        >
                            <Autocomplete
                                disablePortal
                                id="Análise Comportamental"
                                options={processo}
                                value={vaga.personal ? processo[0] : processo[1]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, newValue) => {
                                    setVaga({ ...vaga, personal: newValue?.value });
                                }}
                                renderInput={(params) => <TextField {...params} label="Análise Comportamental" />}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    label="Data de finalização da etapa"
                                    value={personal_date}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setPersonal_date(newValue);
                                        setVaga({ ...vaga, personal_date: formatDate(newValue) });
                                    }}
                                    disabled={!vaga.personal}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            margin: '0 1%',
                        }}
                    />
                    <Grid item xs={selectGrid.xs} md={selectGrid.md}>
                        <Stack
                            direction="column"
                            spacing={2}
                        >
                            <Autocomplete
                                disablePortal
                                id="Dinâmica de Grupo"
                                options={processo}
                                value={vaga.group_event ? processo[0] : processo[1]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, newValue) => {
                                    setVaga({ ...vaga, group_event: newValue?.value });
                                }}
                                renderInput={(params) => <TextField {...params} label="Dinâmica de Grupo" />}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    label="Data de finalização da etapa"
                                    value={group_date}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setGroup_date(newValue);
                                        setVaga({ ...vaga, group_date: formatDate(newValue) });
                                    }}
                                    disabled={!vaga.group_event}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            margin: '0 1%',
                        }}
                    />
                    <Grid item xs={selectGrid.xs} md={selectGrid.md}>
                        <Stack
                            direction="column"
                            spacing={2}
                        >
                            <Autocomplete
                                disablePortal
                                id="Entrevista Final"
                                options={processo}
                                value={vaga.first_interview ? processo[0] : processo[1]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, newValue) => {
                                    setVaga({ ...vaga, first_interview: newValue?.value });
                                }}
                                renderInput={(params) => <TextField {...params} label="Entrevista Final" />}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    label="Data de finalização da etapa"
                                    value={first_interview_date}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setFirst_interview_date(newValue);
                                        setVaga({ ...vaga, first_interview_date: formatDate(newValue) });
                                    }}
                                    disabled={!vaga.first_interview}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            margin: '0 1%',
                        }}
                    />
                    <Grid item xs={selectGrid.xs} md={selectGrid.md}>
                        <Stack
                            direction="column"
                            spacing={2}
                        >
                            <Autocomplete
                                disablePortal
                                id="Entrevista Final"
                                options={processo}
                                value={vaga.final_interview ? processo[0] : processo[1]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, newValue) => {
                                    setVaga({ ...vaga, final_interview: newValue?.value });
                                }}
                                renderInput={(params) => <TextField {...params} label="Entrevista Final" />}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    label="Data de finalização da etapa"
                                    value={final_interview_date}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={(newValue) => {
                                        setFinal_interview_date(newValue);
                                        setVaga({ ...vaga, final_interview_date: formatDate(newValue) });
                                    }}
                                    disabled={!vaga.final_interview}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={4}
                sx={{
                    padding: '2rem 5rem 1rem',
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    {id ? 'Atualizar' : 'Cadastrar'}
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        navigate('/vagas');
                    }}
                >
                    Cancelar
                </Button>
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

const selectGrid = {
    xs: 12,
    md: 2.2,
};