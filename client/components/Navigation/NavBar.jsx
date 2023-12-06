import { useState } from 'react';

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { createTheme, useMediaQuery, useTheme } from '@mui/material';

import { motion } from 'framer-motion';

import logo from "../images/cookingEquipmentLogo.png"
import SearchBar from '../SearchEquipment/SearchBar';
import MobileNavBar from './MobileNavBar';
import LogoutButton from '../AuthorizationForms/LogoutButton';


const NavBar = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ p: 2 }}>
                {isMobile ? <MobileNavBar /> :

                    <Stack direction="row">
                        <img
                            src={logo}
                            width="100"
                            height="100" />
                        <Typography variant="h3" sx={{ color: "#205375", flexGrow: 1 }}>
                            Title Placeholder
                        </Typography>

                        <Box sx={{ maxHeight: "50px", backgroundColor: "#F9FBE7", borderRadius: "50px" }}>
                            <Stack direction="row">
                                <Link to="/">
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Button sx={{ color: "#205375", mx: 5 }}>
                                            <HomeIcon />
                                            Home
                                        </Button>
                                    </motion.div>
                                </Link>
                                <Link to="/posts">
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Button sx={{ color: "#205375", mx: 5 }}>
                                            Find New Kitchen Equipment
                                        </Button>
                                    </motion.div>
                                </Link>
                                <Link to="/new_review">
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Button sx={{ color: "#205375", mx: 5 }}>
                                            <RateReviewIcon /> Add a Review
                                        </Button>
                                    </motion.div>
                                </Link>


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
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Link
                                            to="/login"
                                            style={{ textDecoration: "none" }}>
                                            <MenuItem>
                                                <Button>
                                                    Login
                                                </Button>
                                            </MenuItem>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Link
                                            to="/register"
                                            style={{ textDecoration: "none" }}>
                                            <MenuItem>
                                                <Button>
                                                    Sign Up
                                                </Button>

                                            </MenuItem>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Link
                                            to="/account"
                                            style={{ textDecoration: "none" }}>
                                            <MenuItem>
                                                <Button>
                                                    My Account
                                                </Button>
                                            </MenuItem>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <MenuItem>
                                            <LogoutButton />
                                        </MenuItem>
                                    </motion.div>
                                </Menu>
                            </Stack>
                        </Box>
                    </Stack>
                }
            </Box>
        </>
    )
}

export default NavBar;