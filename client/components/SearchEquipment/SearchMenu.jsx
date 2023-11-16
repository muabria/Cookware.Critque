import { useState } from "react";

import Button from "@mui/material/Button"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SearchBar from "./SearchBar";

const SearchCategory = () => {
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
            <Button
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: "#205375" }}>
                Explore New Equipment
            </Button>

            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick="TO DO">
                    <Typography variant="h6" sx={{ color: "#205375", p: 2 }}>
                        Explore by name:
                    </Typography>
                    <SearchBar />

                </MenuItem>
                <Typography variant="h6" sx={{ color: "#205375", backgroundColor: "#D3CEDF", p: 2 }}>
                    Not sure what you are looking for? <br />
                    Explore by Category:
                </Typography>
                <MenuItem onClick="TO DO">
                    Cooking Equipment
                </MenuItem>
                <MenuItem onClick="TO DO">
                    Kitchen Cleaning Supplies
                </MenuItem>
                <MenuItem onClick="TO DO">
                    Kitchen Storage
                </MenuItem>
                <MenuItem onClick="TO DO">
                    Kitchen Gadgets
                </MenuItem>
                <MenuItem onClick="TO DO">
                    Miscellaneous
                </MenuItem>
            </Menu>
        </>
    )
}

export default SearchCategory