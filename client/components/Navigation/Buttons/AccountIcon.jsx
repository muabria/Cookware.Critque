import { useState } from "react";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

import Button from "@mui/material/Button"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import MyAccountButton from "./MyAccountButton";

const AccountIcon = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const token = useSelector((state) => state.auth.token);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <AccountCircleIcon sx={{ color: "#205375", minWidth: 70, minHeight: 35 }} />
            </Button>
            {token
                ? //if logged in...
                <div>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}>
                        <motion.div whileHover={{ scale: 1.2 }}>
                            <MenuItem>
                                <MyAccountButton />
                            </MenuItem>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}>
                            <MenuItem>
                                <LogoutButton />
                            </MenuItem>
                        </motion.div>
                    </Menu>
                </div>
                ://if NOT logged in...
                <div>
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
                                    <LoginButton />
                                </MenuItem>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}>
                            <Link
                                to="/register"
                                style={{ textDecoration: "none" }}>
                                <MenuItem>
                                    <SignUpButton />
                                </MenuItem>
                            </Link>
                        </motion.div>
                    </Menu>
                </div>
            }
        </div>
    )
}
export default AccountIcon