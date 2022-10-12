import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';

import { MdOutlinePersonPin } from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs';
import { IoGameController } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiQuestionnaireFill } from 'react-icons/ri';

interface ListitemProps {
  name: string;
  icon: JSX.Element;
  link: string;
  component: JSX.Element;
}

const plus = <AiOutlinePlus />;

export const mainListItems = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/dashboard',
    component: <>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </>
  }, {
    name: 'Missões',
    icon: <IoGameController />,
    link: '/missions',
    component:
      <ListItemButton>
        <ListItemIcon>
          <IoGameController
            size={25}
          />
        </ListItemIcon>
        <ListItemText primary="Missões" />
      </ListItemButton>
  }, {
    name: 'Quiz',
    icon: <RiQuestionnaireFill />,
    link: '/quiz',
    component:
      <ListItemButton>
        <ListItemIcon>
          <RiQuestionnaireFill
            size={24}
          />
        </ListItemIcon>
        <ListItemText primary="Quiz" />
      </ListItemButton>
  }, {
    name: 'Cursos',
    icon: <SchoolIcon />,
    link: '/cursos',
    component:
      <ListItemButton>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Cursos" />
      </ListItemButton>
  }, {
    name: 'Vagas',
    icon: <BadgeIcon />,
    link: '/vagas',
    component:
      <ListItemButton>
        <ListItemIcon>
          <BadgeIcon />
        </ListItemIcon>
        <ListItemText primary="Vagas" />
      </ListItemButton>
  }, {
    name: 'Perfil',
    icon: <MdOutlinePersonPin />,
    link: '/profile',
    component:
      <ListItemButton>
        <ListItemIcon>
          <MdOutlinePersonPin
            size={25}
          />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItemButton>
  }
];

export const secondaryListItems: ListitemProps[] = [
  {
    name: 'Ver Candidatos',
    icon: <BsPersonLinesFill />,
    link: '/candidatos',
    component:
      <ListItemButton>
        <ListItemIcon>
          <BsPersonLinesFill
            size={25}
          />
        </ListItemIcon>
        <ListItemText primary="Ver Candidatos" />
      </ListItemButton>
  },
  {
    name: 'Nova Vaga',
    icon: <BadgeIcon />,
    link: '/vagas/form',
    component:
      <ListItemButton>
        <ListItemIcon>
          <BadgeIcon />
          {plus}
        </ListItemIcon>
        <ListItemText primary="Nova Vaga" />
      </ListItemButton>
  },
  {
    name: 'Novo Curso',
    icon: <SchoolIcon />,
    link: '/cursos/form',
    component:
      <ListItemButton>
        <ListItemIcon>
          <SchoolIcon />
          {plus}
        </ListItemIcon>
        <ListItemText primary="Novo Curso" />
      </ListItemButton>
  }
];