import { Api } from 'api/api';
import { IUser } from './types';

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('id', JSON.stringify(user));
}

export function getUserLocalStorage() {
    const user = localStorage.getItem('id');
    return user ? JSON.parse(user) : null;
}

export async function LoginRequest(user: string, password: string) {
    try {
        const request = await Api({
            method: 'POST',
            url: '/users/login',
            params: {
                user,
                password,
            }
        });

        return request.data;
    } catch (error) {
        return null;
    }
}