import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import RateReviewIcon from '@mui/icons-material/RateReview';

import logo from "../images/cookingEquipmentLogo.png"

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { useGetUserQuery } from '../../redux/api';

import LogoutButton from "../AuthorizationForms/LogoutButton";

const MobileNavBar = () => {

    const { data, error, isLoading } = useGetUserQuery()

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
                        <Typography variant="h6" sx={{ color: "#205375", flexGrow: 1 }}>
                            Title Placeholder
                        </Typography>

                    </Stack>
                </AccordionSummary>
                {data
                    ?//if logged in...
                    <div>
                        <AccordionDetails>
                            <Box sx={{ borderBottom: 2, color: "#205375", mx: 1 }} >
                                <Link to="/account"
                                    stle={{ textDecoration: "none" }}>
                                    <Typography sx={{ color: "#205375" }}>
                                        My Account
                                    </Typography>
                                </Link>
                            </Box>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Box sx={{ borderBottom: 2, color: "#205375", mx: 1 }}>
                                <LogoutButton />
                            </Box>
                        </AccordionDetails>
                    </div>
                    : //if NOT logged in...
                    <div>
                        <AccordionDetails>
                            <Box sx={{ borderBottom: 2, color: "#205375", mx: 1 }} >
                                <Link to="/login"
                                    style={{ textDecoration: "none" }}>
                                    <Typography sx={{ color: "#205375" }}>
                                        Login
                                    </Typography>
                                </Link>
                            </Box>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Box sx={{ borderBottom: 2, color: "#205375", mx: 1 }} >
                                <Link to="/register"
                                    style={{ textDecoration: "none" }}>
                                    <Typography sx={{ color: "#205375" }}>
                                        Sign Up
                                    </Typography>
                                </Link>
                            </Box>
                        </AccordionDetails>
                    </div>}
                <AccordionDetails>
                    <Link to="/"
                        style={{ textDecoration: "none" }}>
                        <Box sx={{ borderBottom: 2, color: "#205375" }}>
                            <Stack direction="row">
                                <HomeIcon sx={{ mx: 1 }} />
                                <Typography sx={{ color: "#205375" }}>
                                    Home
                                </Typography>
                            </Stack>
                        </Box>
                    </Link>
                </AccordionDetails>
                <AccordionDetails>
                    <Link to="/posts"
                        style={{ textDecoration: "none" }}>
                        <Box sx={{ borderBottom: 2, color: "#205375" }}>
                            <Typography sx={{ m: 1, color: "#205375" }}>
                                Find New Kitchen Equipment
                            </Typography>
                        </Box>
                    </Link>
                </AccordionDetails>
                <AccordionDetails>
                    <Link to="/new_review"
                        style={{ textDecoration: "none" }}>
                        <Box sx={{ borderBottom: 2, color: "#205375" }} >
                            <Stack direction="row">
                                <RateReviewIcon sx={{ mx: 1 }} />
                                <Typography sx={{ color: "#205375" }}>
                                    Add a Review
                                </Typography>
                            </Stack>
                        </Box>
                    </Link>
                </AccordionDetails>
            </Accordion>

            <Grid container>
                <Grid item xs={10}>

                </Grid>
                <Grid item xs={2}>


                </Grid>
            </Grid>
        </div>
    )
}
export default MobileNavBar