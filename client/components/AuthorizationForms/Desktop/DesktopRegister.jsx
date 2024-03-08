import { useState } from "react";

import { motion } from "framer-motion";

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LoginIcon from '@mui/icons-material/Login';

import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation, useGetAllUsersValidationQuery } from "../../../redux/api";

const DesktopRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { data: userData } = useGetAllUsersValidationQuery();
    const [register, { error, isLoading }] = useRegisterMutation();
    if (!userData) {
        return <div> </div>
    }
    if (isLoading) {
        return null;
    }
    if (error) {
        return <div>Whoops! Something went wrong registering you.</div>
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
                await register({ username, email, password, secondPassword }),
                    console.log("Success!")
                navigate("/account")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const validateUsername = (name) => {
        const compare = userData.find((current) => { return current.username === name })
        if (compare !== undefined) { validUser = false; return <Alert severity="error">Username already exists. Please choose another.</Alert> }
        if (compare === undefined) { validUser = true }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Card
                className="auth-form"
                elevation={10}
                sx={{ mb: 10 }}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "#205375", p: 1 }}>
                    Sign Up:
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Enter Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                            helperText={validateUsername(username)}
                        />
                        <TextField
                            label="Enter E-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
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
                            }
                        />
                        <TextField
                            label="Re-enter Password"
                            value={secondPassword}
                            type="password"
                            onChange={(event) => setSecondPassword(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                            error={
                                !!(password && secondPassword !== secondPassword)
                            }
                            helperText={
                                password && secondPassword && password !== secondPassword ?
                                    <Alert severity="error"> Passwords do not match </Alert> : null
                            } />
                        <Typography textAlign="center">
                            <button
                                className="blue-button"
                                type="submit">
                                Sign Up
                            </button>
                        </Typography>
                        <Typography
                            sx={{ mt: 5, textAlign: "center", color: "#205375" }}>
                            Already have an account?
                        </Typography>
                        <Link to="/login">
                            <Typography sx={{ textAlign: "center" }}>
                                <Button sx={{ textTransform: "none", color: "#205375", backgroundColor: "transparent", fontSize: "16px" }}>
                                    Login to your account
                                    <LoginIcon sx={{ ml: 2, color: "#205375" }} />
                                </Button>
                            </Typography>
                        </Link>
                    </Stack>
                </form>
            </Card>
        </motion.div>
    )
}
export default DesktopRegister