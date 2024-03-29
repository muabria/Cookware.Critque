import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery, useTheme } from '@mui/material';

import { useLoginMutation, useGetAllUsersValidationQuery } from "../../../redux/api";

const MobileLogin = () => {
    const { data: userData, error: userError, isLoading: userIsLoading } = useGetAllUsersValidationQuery();
    const [login, { error }] = useLoginMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    if (error) {
        return <div>Whoops! Something went wrong logging you in.</div>
    }

    let validUser = false;

    const handleSubmit = async (event) => {
        try {
            if (password.length < 8) {
                event.preventDefault();
                alert("Password is too short.");
                return
            }
            if (password.length > 16) {
                event.preventDefault();
                alert("Password is too long.");
                return
            }
            if (validUser === true) {
                event.preventDefault();
                const result = await login({ username, password })
                console.log(result)
                navigate("/account")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const validateUsername = (name) => {
        const compare = userData.find((current) => { return current.username === name })
        if (compare === undefined) { validUser = false; return <Alert severity="error">Username not found.</Alert> }
        if (compare !== undefined) { validUser = true }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Card
                className="mobile-auth-form"
                elevation={10}
                sx={{ mb: 10 }}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "#205375", p: 1 }}>
                    Login:
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Enter Login Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                            helperText={username && validateUsername(username)}
                        />
                        <TextField
                            label="Enter Password"
                            value={password}
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                            helperText={
                                password && password.length < 8
                                    ? <Alert severity="error"> Your password needs to be at least 8 characters long </Alert>
                                    : password.length > 16 ? <Alert severity="error"> Your password cannot be more than 16 characters long </Alert>
                                        : null
                            } />
                        <button
                            className="mobile-auth-button"
                            type="submit">
                            Login
                        </button>
                        <Typography sx={{ mt: 2, textAlign: "center", color: "#205375" }}>
                            Don't have an account?
                        </Typography>
                        <Link to="/register">
                            <Button
                                variant="text"
                                sx={{ textTransform: "none", backgroundColor: "transparent", my: 1, color: "#205375", width: "100%" }}>
                                Sign up!
                                <LoginIcon sx={{ ml: 2, color: "#205375" }} />
                            </Button>
                        </Link>
                    </Stack>
                </form>
            </Card>
        </motion.div>
    )
}
export default MobileLogin