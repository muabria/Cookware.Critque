import Box from '@mui/material/Box';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useMediaQuery, useTheme } from '@mui/material';

import MobileNavBar from './MobileNavBar';
import DesktopNavBar from './DesktopNavBar';

const NavBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            <Box sx={{ p: 2 }}>
                {isMobile
                    ?
                    <MobileNavBar />
                    :
                    <DesktopNavBar />
                }
            </Box>
        </>
    )
}

export default NavBar;