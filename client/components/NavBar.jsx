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

// import logo from "./images/cookingEquipmentLogo.jpg"
import SearchMenu from './SearchEquipment/SearchMenu';


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
            <Box sx={{ backgroundColor: "white", p: 2 }}>
                <Stack direction="row" useFlexGap flexWrap="wrap">
                    {/*-----------------------------------APP TITLE--------------------------------------------- */}
                    {/* <img src={logo} /> */}
                    <Typography variant="h3" sx={{ color: "#205375", flexGrow: 1 }}>
                        Title Placeholder
                    </Typography>
                    {/*-----------------------------------MENU--------------------------------------------- */}
                    <Link to="/">
                        <Button sx={{ color: "#205375" }}>
                            <HomeIcon />
                            Go to Home
                        </Button>
                    </Link>
                    <Link to="/new_review">
                        <Button sx={{ color: "#205375" }}>
                            Add a Review
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
                                Login
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/register">
                                Sign Up
                            </Link>
                        </MenuItem>
                    </Menu>
                </Stack>
            </Box>
            {/*-----------------------------------------------SECOND ROW--------------------------------------------------------- */}
            <Box sx={{ backgroundColor: "transparent", mb: 2, p: 2 }}>
                <SearchMenu />
            </Box>
        </>
    )
}

export default NavBar;