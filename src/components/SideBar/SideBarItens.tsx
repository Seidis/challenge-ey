import Cursos from 'pages/Cursos';
import Vagas from 'pages/Vagas';

import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';

const SideBarItens = [
	{
		path: '/Vagas',
		name: 'Vagas',
		component: <Vagas />,
		icon: <BadgeIcon />
	},
	{
		path: '/Cursos',
		name: 'Cursos',
		component: <Cursos />,
		icon: <SchoolIcon />
	}
];

export default SideBarItens;