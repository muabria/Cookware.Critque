import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Button from "@mui/material/Button"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
            <AppBar position="static" sx={{ p: 1, backgroundColor: "#EFEFEF" }}>
                <Stack direction="row" useFlexGap flexWrap="wrap">
                    {/*-----------------------------------App title--------------------------------------------- */}
                    <Typography variant="h3" sx={{ color: "#000000", flexGrow: 1 }}>
                       Title Placeholder
                    </Typography>
                    {/*-----------------------------------Account Menu--------------------------------------------- */}
                    <Button
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <AccountCircleIcon sx={{ color: "#000000", minWidth: 70, minHeight: 35 }} />
                    </Button>

                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}>
                        <MenuItem onClick="TO DO">
                            Login
                        </MenuItem>
                        <MenuItem onClick="TO DO">
                            Sign Up
                        </MenuItem>
                    </Menu>
                </Stack>
            </AppBar>


        </>
    )
}

export default NavBar;