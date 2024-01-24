import Box from '@mui/material/Box';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useMediaQuery, useTheme } from '@mui/material';

import logo from "./cookingEquipmentLogo.png";
import MobileNavBar from './MobileNavBar';

import HomePageButton from './Buttons/HomePageButton';
import EquipmentAndReviewsButton from './Buttons/EquipmentAndReviewsButton';
import AddReviewButton from './Buttons/AddReviewButton';
import AccountIcon from './Buttons/AccountIcon';

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
                    <Stack direction="row">
                        <img
                            src={logo}
                            width="100"
                            height="100" />
                        <Typography variant="h1" sx={{ color: "#205375", flexGrow: 1, fontSize: "40px" }}>
                            Cookware Critique
                        </Typography>
                        <Box sx={{ maxHeight: "50px", backgroundColor: "#F9FBE7", borderRadius: "50px" }}>
                            <Stack direction="row">
                               <HomePageButton />
                               <EquipmentAndReviewsButton />
                               <AddReviewButton />
                              <AccountIcon />
                            </Stack>
                        </Box>
                    </Stack>
                }
            </Box>
        </>
    )
}

export default NavBar;