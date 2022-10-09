import { Box, Grid } from "@mui/material";
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
			<Box>
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
						marginTop: '20px',
						marginBottom: '80px'
					}}
				>
					{
						vagas.map((vaga, index) => (
							<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
								<VagasCard
									id={vaga.id}
									image={vaga.image}
									title={vaga.title}
									shortDescription={vaga.shortDescription}
									description={vaga.description}
									salary={vaga.salary}
									location={vaga.location}
									type={vaga.type}
									level={vaga.level}
									loading={vaga.loading}
								/>
							</Grid>
						))
					}
				</Grid>
			</Box>
			<Box>
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
						marginTop: '20px',
						marginBottom: '100px'
					}}
				>
					{
						vagas.map((vaga, index) => (
							<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
								<VagasCard
									id={vaga.id}
									image={vaga.image}
									title={vaga.title}
									shortDescription={vaga.shortDescription}
									description={vaga.description}
									salary={vaga.salary}
									location={vaga.location}
									type={vaga.type}
									level={vaga.level}
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