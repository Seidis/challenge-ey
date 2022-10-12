import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { Api } from "api/api";
import Title from "components/Title";
import { useEffect, useState } from "react";
import VagasCard from "./VagasCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { VagasProps as Vaga } from "./__types";
import { types2 as types } from "./__options";

export default function Vagas() {

	const [vagas, setVagas] = useState<Vaga[]>([]);
	const [vagasFiltradas, setVagasFiltradas] = useState<Vaga[]>([]);
	const [expanded, setExpanded] = useState<string | false>(false);
	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};
	const [selected, setSelected] = useState<string>('');


	async function getVagas() {
		const req = await Api.get('/vagas/ativas').then((response) => {
			setVagasFiltradas(response.data);
			return response.data;
		}).catch((error) => {
			console.log(error);
		});

		return req;
	}

	useEffect(() => {
		getVagas().then((response) => {
			setVagas(response);
		});
	}, []);

	function handleVagasFiltradas(tipo = 'Todos') {
		const vagasFiltradas = vagas.filter((vaga) => vaga.type === tipo);
		setVagasFiltradas(vagasFiltradas);
		setSelected(tipo);
		if (tipo === 'Todos') {
			setVagasFiltradas(vagas);
		}
	}

	return (
		<Box>
			<Box
				sx={{
					marginTop: '1%',
				}}
			>
				<Paper
					elevation={8}
					sx={{
						padding: '1%',
						backgroundColor: '#f5f5f5'
					}}
				>
					<Title
						title="Vagas Recomendadas para Você"
					/>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={2}
						sx={{
							marginTop: '1%',
							marginBottom: '40px'
						}}
					>
						{
							vagas.map((vaga, index) =>
								index < 3 ?
									(
										<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
											<VagasCard
												id={vaga.id}
												image={vaga.image}
												title={vaga.title}
												short_description={vaga.short_description}
												description={vaga.description}
												salary={vaga.salary}
												location={vaga.location}
												type={vaga.type}
												level={vaga.level}
												expire_date={vaga.expire_date}
												loading={vaga.loading}
											/>
										</Grid>
									)
									: null
							)
						}
					</Grid>
				</Paper>
			</Box>
			<Box
				sx={{
					paddingTop: '1%'
				}}
			>
				<Title
					title="Todas as Vagas"
				/>
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
													onClick={() => handleVagasFiltradas(type)}
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
				<Grid
					container
					direction="row"
					spacing={2}
					sx={{
						marginTop: '1%',
						marginBottom: '5%',
						px: '5%'
					}}
				>
					{
						vagasFiltradas.length > 0 ? (

							vagasFiltradas.map((vaga, index) => (
								<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
									<VagasCard
										id={vaga.id}
										image={vaga.image}
										title={vaga.title}
										short_description={vaga.short_description}
										description={vaga.description}
										salary={vaga.salary}
										location={vaga.location}
										type={vaga.type}
										level={vaga.level}
										expire_date={vaga.expire_date}
										loading={vaga.loading}
									/>
								</Grid>
							))
						) : (
							<Typography
								variant="h6"
								sx={{
									textAlign: 'center',
									width: '100%'
								}}
							>
								Nenhuma vaga encontrada :(
							</Typography>
						)
					}
				</Grid>
			</Box>
		</Box >
	);
}