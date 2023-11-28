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

import logo from "./images/cookingEquipmentLogo.png"
import SearchBar from './SearchEquipment/SearchBar';


const NavBar = () => {
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
                {/*-----------------------------------APP TITLE--------------------------------------------- */}
                <Stack direction="row">
                    <img
                        src={logo}
                        width="100"
                        height="100" />
                    <Typography variant="h3" sx={{ color: "#205375", flexGrow: 1 }}>
                        Title Placeholder
                    </Typography>
                    {/*-----------------------------------ACCOUNT MENU--------------------------------------------- */}
                    <Box sx={{ maxHeight:"50px", backgroundColor:"#F9FBE7", borderRadius:"50px"}}>
                        <Link to="/">
                            <Button sx={{ color: "#205375", mx: 5 }}>
                                <HomeIcon />
                                Home
                            </Button>
                        </Link>
                        <Link to="/posts">
                            <Button sx={{ color: "#205375", mx: 5 }}>
                                Find New Kitchen Equipment
                            </Button>
                        </Link>
                        <Link to="/new_review">
                            <Button sx={{ color: "#205375", mx: 5 }}>
                                <RateReviewIcon /> Add a Review
                            </Button>
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
                                <Link to="/admin_dashboard">
                                    <Button>
                                        admin
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/account">
                                    <Button>
                                        user dashboard
                                    </Button>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Stack>
            </Box>
            {/*-----------------------------------NAVIGATION BUTTONS--------------------------------------------- */}

        </>
    )
}

export default NavBar;