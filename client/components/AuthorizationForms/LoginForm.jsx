import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

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

import LoadingMessage from "../ErrorMessages/LoadingMessage"

import { useLoginMutation, useGetAllUsersValidationQuery } from "../../redux/api";

const LoginForm = () => {
    const {data: userData, error: userError, isLoading: userIsLoading} = useGetAllUsersValidationQuery();
    const [login, { data, error }] = useLoginMutation();
    if (error) {
        return <div>Whoops! Something went wrong logging you in.</div>
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    if (error) {
        return <div>Whoops! Something went wrong logging you in.</div>
    }

    const handleSubmit = async (event) => {
        try {
            if (password.length < 8) {
                event.preventDefault();
                alert("Password is too short.");
                return
            }
            else if (password.length > 16) {
                event.preventDefault();
                alert("Password is too long.");
                return
            }
            event.preventDefault();
            const result = await login({ username, password })
            console.log(result)
            navigate("/account")
        } catch (error) {
            console.error(error)
        }
    }

    const validateUsername = (name) => {
        const compare = userData.find((current) => {return current.username === name})
        if (compare === undefined) {return <Alert severity="error">Username not found.</Alert>}
    }

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn"}}>
            <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Card sx={{ p: 5, backgroundColor: "white", maxWidth: 600 }}>
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
                                    }
                                />
                                {isMobile ?
                                    <div>
                                        <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", width: "100%", p: 1 }}>
                                            Login
                                        </Button>
                                        <Typography sx={{ mt: 2, textAlign: "center", color: "#205375" }}>
                                            Don't have an account?
                                        </Typography>
                                        <Link to="/register">
                                            <Button
                                                variant="outlined"
                                                sx={{ color: "#000000", backgroundColor: "transparent", my: 1, color: "#205375", width: "100%" }}>
                                                Sign up!
                                                <LoginIcon sx={{ ml: 2, color: "#205375" }} />
                                            </Button>
                                        </Link>
                                    </div>
                                    ://is NOT mobile... 
                                    <div>
                                        <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", p: 1, mx: 30 }}>
                                            Login
                                        </Button>
                                        <Typography sx={{ mt: 2, textAlign: "center", color: "#205375" }}>
                                            Don't have an account?
                                        </Typography>
                                        <Link to="/register">
                                            <Button
                                                variant="outlined"
                                                sx={{ color: "#000000", backgroundColor: "transparent", my: 1, color: "#205375", mx: 28 }}>
                                                Sign up!
                                                <LoginIcon sx={{ ml: 2, color: "#205375" }} />
                                            </Button>
                                        </Link>
                                    </div>}

                            </Stack>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </motion.div>
    )
}
export default LoginForm