import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { IVagas } from 'data/__interfaces';
import { firebaseApp } from 'data/__firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

import RecomendedPage from './Recomended';

function Vagas() {
	const db = getFirestore(firebaseApp);
	const vagasRef = collection(db, 'vagas');

	const [loading, setLoading] = useState(true);

	const [cardValues, setCardValues] = useState([]);

	const list: typeof cardValues = [];
	const getJobList = async () => {
		try {
			const querySnapshot = await getDocs(vagasRef);
			// querySnapshot.forEach((doc) => {
			// 	list.push(doc.data());
			// });
			console.log(list);

		}
		catch (error) {
			console.log(error);
		}
		finally {
			setLoading(false);
		}
		return list;
	};

	return (
		<div style={{ width: '100%' }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Vagas
			</Typography>
			<Box sx={{ width: '100%' }}>
				<RecomendedPage
				// list={getJobList()}
				// loading={loading}
				/>
			</Box>
		</div>
	);
}

export default function VagasPage() {
	return <Vagas />;
}