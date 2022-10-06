import { useState } from 'react';

import { Avatar, Chip, MenuItem, Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

import icon from 'components/IconChip/batman_icon.png';
import { chipItems } from './listItems';
import { useNavigate } from 'react-router-dom';
import { ExitToApp } from '@mui/icons-material';

import { Api } from 'api/api';

export function AvatarChip() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const navigateTo = (nav: string) => {
        navigate(nav);
        setAnchorEl(null);
    };
    const handleExit = () => {
        window.localStorage.removeItem('id');
        navigate('/login');
    };

    async function getUser(id: string) {
        const request = await Api.get('/users/' + id);

        return request.data;
    }

    const getID = JSON.parse(window.localStorage?.getItem('id') || '{}');

    const [name, setName] = useState('');
    getUser(getID.id).then((response) => {
        setName(response.name);
    });


    return (
        <div>
            <Chip
                avatar={<Avatar alt="Batman" src={icon} />}
                label={name}
                variant="outlined"
                color='info'
                onClick={handleClick}
                sx={{
                    fontSize: '1rem'
                }}
            />
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {chipItems.map((item, index) => (
                    <div key={index}>
                        <MenuItem
                            onClick={
                                () => navigateTo(item.link)
                            }
                            disableRipple
                        >
                            {item.icon}
                            {item.label}
                        </MenuItem>
                        <Divider />
                    </div>
                ))}
                <MenuItem
                    onClick={handleExit}
                    disableRipple
                >
                    <ExitToApp />
                    Sair
                </MenuItem>
            </StyledMenu >
        </div >
    );
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function IconChip() {
    return <AvatarChip />;
}