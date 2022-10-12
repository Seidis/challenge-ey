import { Box } from '@mui/material';
import { ReactComponent as UnauthorizedSVG } from 'assets/unauthorized.svg';

export default function Unauthorized() {
    return (
        <Box>
            <UnauthorizedSVG
                style={{
                    width: '55%',
                    height: 'auto',
                    display: 'block',
                    margin: 'auto',
                }}
            />
        </Box>
    );
}