import { useState } from "react";

import { Link } from "react-router-dom"

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LoginIcon from '@mui/icons-material/Login';

import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/api";

const LoginForm = () => {
    const [login, { data, error, }] = useLoginMutation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            <Card sx={{ p: 5, backgroundColor: "white", maxWidth: 600 }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
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
                        <Button type="submit" sx={{ backgroundColor: "#088395", color: "white", p: 1 }}>
                            Login
                        </Button>
                        <Typography sx={{ mt: 2, textAlign: "center" }}>
                            Don't have an account?
                        </Typography>
                        {/* <Link to="/login"> */}
                        <Button sx={{ color: "#000000", backgroundColor: "transparent", my: 1 }}>
                            Sign up!
                            <LoginIcon sx={{ ml: 2 }} />
                        </Button>
                        {/* </Link> */}
                    </Stack>
                </form>
            </Card>
        </>
    )
}
export default LoginForm