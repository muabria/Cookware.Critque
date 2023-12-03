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

import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../redux/api";

const RegisterForm = () => {
    const [register, error] = useRegisterMutation();
    if (error) {
        return <div>Whoops! Something went wrong registering you.</div>
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await register({ username, email, password, secondPassword }),
                console.log("Success!")
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
                    <motion.div
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", delay: (0.5) }}>
                        <Card sx={{ p: 5, backgroundColor: "white", maxWidth: 600 }}>
                            <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
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
                                        error={
                                            !!(password && secondPassword !== secondPassword)
                                        }
                                        helperText={
                                            password && secondPassword && password !== secondPassword ?
                                                <Alert severity="error"> Passwords do not match </Alert> : null
                                        }
                                    />
                                    <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", p: 1, my: 1 }}>
                                        Start Your Cooking Journey
                                    </Button>
                                    <Typography sx={{ mt: 2, textAlign: "center" }}>
                                        Already have an account?
                                    </Typography>
                                    <Link to="/login">
                                        <Button sx={{ color: "#000000", backgroundColor: "transparent", my: 1 }}>
                                            Login to your account
                                            <LoginIcon sx={{ ml: 2 }} />
                                        </Button>
                                    </Link>
                                </Stack>
                            </form>
                        </Card>
                    </motion.div>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </>
    )
}
export default RegisterForm