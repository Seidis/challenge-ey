import { useState } from 'react';
import styles from './Default.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

import { ReactComponent as EYLogo } from 'assets/ey_text.svg';
import { mainListItems, secondaryListItems } from './listItems';

import { styled } from '@mui/material/styles';
// eslint-disable-next-line
import { CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton, Badge, Link, Stack, ListSubheader, Paper } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconChip from 'components/IconChip/IconChip';
import KommunicateChat from './chatbot';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

function DefaultPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(window.localStorage?.getItem('id') || '{}');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar className={styles.header_toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(!open)}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="warning">
              <IconChip />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
        <Toolbar className={styles.drawer_toolbar}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <IconButton onClick={() => setOpen(!open)}>
              <ChevronLeftIcon />
            </IconButton>
            <EYLogo style={{ height: '100%', width: '50%' }} />
          </Stack>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems.map((item, index) => (
            <Link
              key={index}
              underline="none"
              color="inherit"
              onClick={() => {
                navigate(item.link);
              }}
            >
              <div>{item.component}</div>
            </Link>
          ))}
          <Divider sx={{ my: 1 }} />
          {
            user?.role === 'ADMIN' && (
              <>
                <ListSubheader component="div" inset sx={{
                  backgroundColor: '#F7D358',
                }}>
                  Painel Administrativo
                </ListSubheader>
                {secondaryListItems.map((item, index) => (
                  item ? <Link
                    key={index}
                    underline="none"
                    color="inherit"
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    <div>{item.component}</div>
                  </Link> : ''
                ))}
              </>
            )
          }
        </List>
      </Drawer>
      <Box
        component="main"
        className={styles.box_outlet}
      >
        <Toolbar />
        <Paper elevation={4}
          sx={{
            m: 2,
            p: 2
          }}
        >
          <Outlet />
        </Paper>
        {Copyright()}
      </Box>
    </Box>
  );
}

export default function Default() {
  return (
    <>
      <DefaultPage />;
      <KommunicateChat />
    </>
  );
}




function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      Challenge EY - The Five
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
      backgroundColor: '#F7D358',
    },
  }),
);