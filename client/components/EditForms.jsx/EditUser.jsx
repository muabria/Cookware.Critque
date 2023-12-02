import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";

import { usePatchUserMutation, useGetUserQuery } from "../../redux/api";
import { useState } from "react";

const EditUser = () => {
    const {data: userData, isLoading: userIsLoading, error: userError} = useGetUserQuery();
    const [patchUser, {data, isLoading, error}] = usePatchUserMutation();
    if (error) {
        return <div>Error</div>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    console.log(userData);

    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState(userData.password);
    const [secondPassword, setSecondPassword] = useState(userData.password);
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await patchUser({ username, email, password }),
                console.log("Success!")
            navigate("/account")
        } catch (error) {
            console.error(error)
        }
    }

    return userData && (
        <>
            <Card sx={{ p: 5, backgroundColor: "white", maxWidth: 600 }}>
                <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Update Your Account:
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Update Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="filled"
                            placeholder={userData.username}
                            sx={{ m: 1 }}
                        />
                        <TextField
                            label="Update E-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            size="small"
                            variant="filled"
                            placeholder={userData.email}
                            sx={{ m: 1 }}
                        />
                        <TextField
                            label="Update Password"
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
                            label="Re-enter updated Password"
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