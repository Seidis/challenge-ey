import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "api/api";

import Title from "components/Title";
import { Cursos as CursosProps } from "./__types";
import { types2 as types } from './__options';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import CardCursos from "./CardCursos";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Cursos() {
	const user = JSON.parse(window.localStorage?.getItem('id') || '{}');
	const navigate = useNavigate();

	const [expanded, setExpanded] = useState<string | false>(false);
	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const [cursos, setCursos] = useState<CursosProps[]>([]);
	const [cursosFiltrados, setCursosFiltrados] = useState<CursosProps[]>([]);
	const [selected, setSelected] = useState<string>('');

	async function getCursos() {
		const req = await Api.get('/cursos').then((response) => {
			setCursosFiltrados(response.data);
			return response.data;
		}).catch((error) => {
			console.log(error);
		});
		setCursos(req);
	}

	useEffect(() => {
		getCursos();
	}, []);

	function handleCursosFiltrados(tipo = 'Todos') {
		const cursosFiltrados = cursos.filter((curso) => curso.tipo === tipo);
		setCursosFiltrados(cursosFiltrados);
		setSelected(tipo);
		if (tipo === 'Todos') {
			setCursosFiltrados(cursos);
		}
	}

	return (
		<Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				margin="0 5%"
			>
				<Title title="Cursos" />
				{
					user?.role === 'ADMIN' ? (
						<Stack
							direction="row"
							justifyContent="flex-end"
							alignItems="center"
						>
							<Button
								variant="outlined"
								color="success"
								onClick={() => {
									navigate('/cursos/form');
								}}
							>
								Adicionar curso
							</Button>
						</Stack>
					) : null
				}
			</Stack>
			<Box
				sx={{
					m: '2% 5%',
				}}
			>
				<Accordion
					expanded={expanded === '1'}
					onChange={handleChange('1')}
					sx={{
						borderRadius: 1,
						border: 1,
						borderColor: 'grey.500',
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography sx={{ width: '33%', flexShrink: 0 }}>
							Filtros
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid
							container
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							spacing={2}
						>
							<Grid item xs={12} sm={1} md={1} lg={1}>
								<Typography
									variant="h6"
								>
									Área:
								</Typography>
							</Grid>
							<Grid item xs={12} sm={11} md={11} lg={11}>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									width="100%"
								>
									{
										types.map((type) => (
											<Chip
												key={type}
												label={type}
												onClick={() => handleCursosFiltrados(type)}
												color={selected === type ? 'primary' : 'default'}
												sx={{
													cursor: 'pointer',
												}}
											/>
										))
									}
								</Stack>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
			</Box>
			{
				cursosFiltrados.length > 0 ? (
					cursosFiltrados.map((curso) => (
						<CardCursos
							key={curso.id}
							id={curso.id}
							title={curso.title}
							description={curso.description}
							image={curso.image}
							tipo={curso.tipo}
						/>
					))
				) : (
					<Typography
						variant="h6"
						align="center"
					>
						Nenhum curso encontrado :(
					</Typography>
				)
			}
		</Box>
	);
}