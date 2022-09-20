import { firebaseApp } from 'data/__firebase';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export async function get(table: string) {
    const data = await getDocs(collection(db, table));
    // eslint-disable-next-line
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
}

export async function getOne(table: string, id: string) {
    const data = await getDocs(collection(db, table));
    // eslint-disable-next-line
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })).find((doc: any) => doc.id === id);
}

export async function getOneBy(table: string, field: string, value: string) {
    const data = await getDocs(collection(db, table));
    // eslint-disable-next-line
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })).find((doc: any) => doc[field] === value);
}

export async function getManyBy(table: string, field: string, value: string) {
    const data = await getDocs(collection(db, table));
    // eslint-disable-next-line
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })).filter((doc: any) => doc[field] === value);
}

// eslint-disable-next-line
export async function post(table: string, data: any) {
    const docRef = await addDoc(collection(db, table), data);
    return docRef.id;
}

// eslint-disable-next-line
export async function patch(table: string, id: string, data: any) {
    const ref = doc(db, table, id);
    await setDoc(ref, data);
}

export async function remove(table: string, id: string) {
    const ref = doc(db, table, id);
    await deleteDoc(ref);
}