import { useState } from "react";

import { Link } from "react-router-dom"

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LoginIcon from '@mui/icons-material/Login';

import { useRegisterMutation } from "../redux/api";
import { useSelector } from 'react-redux';

const RegisterForm = () => {
    const [register] = useRegisterMutation();
    const token = useSelector((state) => state.token);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        register({ username, email, password, secondPassword}), 
        console.log("Success!")
    }

    return (
        <>
            <Card sx={{ p: 5, backgroundColor: "#FEF1E6" }}>
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
                        <Button type="submit" sx={{ color: "#205375", backgroundColor: "#D3CEDF", p: 1, my: 1 }}>
                            Start Your Cooking Journey
                        </Button>
                        <Typography sx={{ mt: 2, textAlign: "center" }}>
                            Already have an account?
                        </Typography>
                        {/* <Link to="/login"> */}
                            <Button sx={{ color: "#000000", backgroundColor: "transparent", my: 1 }}>
                                Login to your account
                                <LoginIcon sx={{ ml: 2 }} />
                            </Button>
                        {/* </Link> */}
                    </Stack>
                </form>
            </Card>
        </>
    )
}
export default RegisterForm