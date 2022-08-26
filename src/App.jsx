import { useEffect, useState } from 'react';

import { addDoc, getDocs, deleteDoc, getFirestore, collection, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'data/__firebase';

export default function App() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [user, setUser] = useState([]);

	const db = getFirestore(initializeApp(firebaseConfig));
	const userCollectionRef = collection(db, 'users');

	async function criarUser() {
		const user = await addDoc(userCollectionRef, {
			name,
			email,
		});
		console.log(user);
	}

	async function deleteUser(id) {
		const userDoc = doc(db, 'users', id);
		await deleteDoc(userDoc);
	}

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(userCollectionRef);
			setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUsers();
	}, []);

	return (
		<div>
			<input type="text" placeholder='nome' value={name} onChange={(e) => setName(e.target.value)} />
			<input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			<button type='submit' onClick={criarUser}>Enviar</button>
			<ul>
				{user.map((user) => (
					<>
						<li key={user.id}>
							{user.name} - {user.email}
						</li>
						<button onClick={() => deleteUser(user.id)}>delete</button>
					</>
				))}
			</ul>
		</div>
	);
}