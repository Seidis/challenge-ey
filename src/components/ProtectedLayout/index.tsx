import { useAuth } from 'context/AuthProvider/useAuth';
import { getUserLocalStorage } from 'context/AuthProvider/utils';
import NotLogged from 'pages/NotLogged';
import { useNavigate } from 'react-router-dom';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();

    const user = getUserLocalStorage();

    if (!user) {
        return <NotLogged />;
    }

    return children;
};