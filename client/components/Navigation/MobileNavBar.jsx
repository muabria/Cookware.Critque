import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import RateReviewIcon from '@mui/icons-material/RateReview';

import logo from "../images/cookingEquipmentLogo.png"

import { Link } from "react-router-dom";

const MobileNavBar = () => {
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


                <AccordionDetails>
                    <Link to="/">
                        <Box sx={{ borderBottom: 2, color: "#205375" }}>
                            <Button sx={{ color: "#205375" }}>
                                <HomeIcon />
                                Home
                            </Button>
                        </Box>
                    </Link>
                </AccordionDetails>



                <AccordionDetails>
                    <Link to="/posts">
                        <Box sx={{ borderBottom: 2, color: "#205375" }}>
                            <Button sx={{ color: "#205375" }}>
                                Find New Kitchen Equipment
                            </Button>
                        </Box>
                    </Link>
                </AccordionDetails>

                <AccordionDetails>
                    <Link to="/new_review">
                        <Box sx={{ borderBottom: 2, color: "#205375" }} >
                            <Button sx={{ color: "#205375" }}>
                                <RateReviewIcon /> Add a Review
                            </Button>
                        </Box>
                    </Link>
                </AccordionDetails>

            </Accordion>

        </div>
    )
}
export default MobileNavBar