import { Box, Grid, Paper } from "@mui/material";
import { Api } from "api/api";
import Title from "components/Title";
import { useEffect, useState } from "react";
import VagasCard from "./VagasCard";
import { VagasProps as Vaga } from "./__types";

export default function Vagas() {

	const [vagas, setVagas] = useState<Vaga[]>([]);

	async function getVagas() {
		const req = await Api.get('/vagas/ativas').then((response) => {
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
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="space-between"
					spacing={2}
					sx={{
						marginTop: '1%',
						marginBottom: '5%',
						px: '5%'
					}}
				>
					{
						vagas.map((vaga, index) => (
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
					}
				</Grid>
			</Box>
		</Box >
	);
}