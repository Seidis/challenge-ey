import { getUserLocalStorage } from 'context/AuthProvider/utils';
import NotLogged from 'pages/NotLogged';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {

    const user = getUserLocalStorage();

    if (!user) {
        return <NotLogged />;
    }

    return children;
};