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
                    alt="Picture of logo with a pot with a clock inside"
                    width="40"
                    height="40" />
                <Typography variant="h1" sx={{ color: "#205375", flexGrow: 1, fontWeight: "bold",fontSize: "30px" }}>
                    Cookware Critique
                </Typography>
                <Box sx={{ maxHeight: "50px", backgroundSize: "90%", backgroundImage: "radial-gradient(circle, #fcfcfc, #fefafd, #fff8f9, #fff7f2, #fff8ec, #fdf7e5, #f9f6de)", borderRadius: "50px", boxShadow: "3px 3px 3px #746107" }}>
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