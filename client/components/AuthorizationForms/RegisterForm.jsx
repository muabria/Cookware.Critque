import { useState } from "react";

import { motion } from "framer-motion";

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery, useTheme } from '@mui/material';

import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation, useGetAllUsersValidationQuery } from "../../redux/api";
import DesktopRegister from "./Desktop/DesktopRegister";
import MobileRegister from "./Mobile/MobileRegister";

const RegisterForm = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileRegister />
                </div>
                :
                <div>
                    <DesktopRegister />
                </div>}
        </div>
    )
}
export default RegisterForm