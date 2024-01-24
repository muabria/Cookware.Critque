import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import HomePageButton from './Buttons/HomePageButton';
import EquipmentAndReviewsButton from './Buttons/EquipmentAndReviewsButton';
import AddReviewButton from './Buttons/AddReviewButton';
import AccountIcon from './Buttons/AccountIcon';

import logo from "./cookingEquipmentLogo.png";

const DesktopNavBar = () => {
    return (
        <div>
            <Stack direction="row">
                <img
                    src={logo}
                    width="100"
                    height="100" />
                <Typography variant="h1" sx={{ color: "#205375", flexGrow: 1, fontSize: "40px" }}>
                    Cookware Critique
                </Typography>
                <Box sx={{ maxHeight: "50px", backgroundColor: "#F9FBE7", borderRadius: "50px" }}>
                    <Stack direction="row" sx={{ px: 3 }}>
                            <HomePageButton />
                            <EquipmentAndReviewsButton />
                            <AddReviewButton />
                            <AccountIcon />
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}
export default DesktopNavBar