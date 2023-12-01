import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";

import { usePatchUserMutation } from "../../redux/api";
import { useState } from "react";

const EditUser = () => {
    const [patchUser, {data, isLoading, error}] = usePatchUserMutation();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await patchUser({ username, email, password, secondPassword }),
                console.log("Success!")
            navigate("/account")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Card sx={{ p: 5, backgroundColor: "white", maxWidth: 600 }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Update Your Account:
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
                            Update Your Account
                        </Button>
                    </Stack>
                </form>
            </Card>
        </>
    )
}
export default EditUser