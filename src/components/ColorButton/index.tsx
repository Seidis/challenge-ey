import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';


export const ColorButton = styled(Button)<ButtonProps>(({
    color: '#58595B',
    backgroundColor: '#FBE64D',
    '&:hover': {
        backgroundColor: '#AA9C33',
    },
}));