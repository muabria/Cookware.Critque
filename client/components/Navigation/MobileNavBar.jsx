import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

import LogoutButton from "../AuthorizationForms/LogoutButton";

const MobileNavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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

            <Grid container>
                <Grid item xs={10}>

                </Grid>
                <Grid item xs={2}>
                    <Button
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <AccountCircleIcon sx={{ color: "#205375", minWidth: 70, minHeight: 35 }} />
                    </Button>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}>
                        <MenuItem>
                            <Link to="/login">
                                <Button>
                                    Login
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/register">
                                <Button>
                                    Sign Up
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/account">
                                <Button>
                                    My Account
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <LogoutButton />
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </div>
    )
}
export default MobileNavBar