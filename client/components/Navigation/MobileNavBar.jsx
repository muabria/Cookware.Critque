import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import logo from "./cookingEquipmentLogo.png";

import { Link } from "react-router-dom";

import { useGetUserQuery } from '../../redux/api';

import LogoutButton from "./Buttons/LogoutButton";
import MyAccountButton from './Buttons/MyAccountButton';
import LoginButton from './Buttons/LoginButton';
import SignUpButton from './Buttons/SignUpButton';
import HomePageButton from './Buttons/HomePageButton';
import EquipmentAndReviewsButton from './Buttons/EquipmentAndReviewsButton';
import AddReviewButton from './Buttons/AddReviewButton';

const MobileNavBar = () => {

    const { data, error, isLoading } = useGetUserQuery()

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        console.log(error)
    }

    return (
        <div>
            <Accordion sx={{ backgroundColor: "transparent" }}>
                <AccordionSummary>
                    <MoreVertIcon />
                    <Stack direction="row">
                        <img
                            src={logo}
                            width="40"
                            height="40" />
                        <Typography variant="h1" sx={{ mx: 1, color: "#205375", flexGrow: 1, fontSize: "20px" }}>
                            Cookware Critique
                        </Typography>
                    </Stack>
                </AccordionSummary>
                {data
                    ?//if logged in...
                    <div>
                        <AccordionDetails>
                            <Box sx={{ pb: 1, border: 1, borderColor: "#205375", borderRadius: "50px" }}>
                                <Typography sx={{ textAlign: "center" }}>
                                    <MyAccountButton />
                                </Typography>
                            </Box>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Box sx={{ pb: 1, border: 1, borderColor: "#205375", borderRadius: "50px" }}>
                                <Typography sx={{ textAlign: "center" }}>
                                    <LogoutButton />
                                </Typography>
                            </Box>
                        </AccordionDetails>
                    </div>
                    : //if NOT logged in...
                    <div>
                        <AccordionDetails>
                            <Box sx={{ pb: 1, border: 1, borderColor: "#205375", borderRadius: "50px" }} >
                                <Typography sx={{ textAlign: "center" }}>
                                    <LoginButton />
                                </Typography>
                            </Box>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Box sx={{ pb: 1, border: 1, borderColor: "#205375", borderRadius: "50px" }} >
                                <Typography sx={{ textAlign: "center" }}>
                                    <SignUpButton />
                                </Typography>
                            </Box>
                        </AccordionDetails>
                    </div>}
                <AccordionDetails>
                    <Link to="/"
                        style={{ textDecoration: "none" }}>
                        <Box sx={{ pb: 1, border: 1, borderColor: "#205375", borderRadius: "50px" }} >
                            <Typography sx={{ textAlign: "center" }}>
                                <HomePageButton />
                            </Typography>
                        </Box>
                    </Link>
                </AccordionDetails>
                <AccordionDetails>
                    <Box sx={{ pb: 1, border: 1, borderColor: "#205375", borderRadius: "50px" }} >
                        <Typography sx={{ textAlign: "center" }}>
                            <EquipmentAndReviewsButton />
                        </Typography>
                    </Box>
                </AccordionDetails>
                <AccordionDetails>
                    <Box sx={{ pb: 1, border: 1, borderColor: "#205375", borderRadius: "50px" }} >
                        <Typography sx={{ textAlign: "center" }}>
                            <AddReviewButton />
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
export default MobileNavBar