import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';

interface ListitemProps {
  name: string;
  icon: JSX.Element;
  link: string;
  component: JSX.Element;
}

export const mainListItems = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/',
    component: <>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </>
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
  }
];

export const secondaryListItems: ListitemProps[] = [];