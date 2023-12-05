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

import { useLoginMutation } from "../../redux/api";

const LoginForm = () => {
    const [login, { data, error, }] = useLoginMutation();
    if (error) {
        return <div>Whoops! Something went wrong logging you in.</div>
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await login({ username, password })
            console.log(result)
            navigate("/account")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
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
                                            : null
                                    }
                                />
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

                            </Stack>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </>
    )
}
export default LoginForm