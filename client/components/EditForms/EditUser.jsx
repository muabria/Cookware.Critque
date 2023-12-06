import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useNavigate, useParams } from "react-router-dom";

import { usePatchUserMutation, useGetUserQuery } from "../../redux/api";
import { useState } from "react";
import LoadingMessage from "../ErrorMessages/LoadingMessage";

const EditUser = () => {
    const { id } = useParams();

    const { data: userData, isLoading: userIsLoading, error: userError } = useGetUserQuery(id);
    const [patchUser, { data, isLoading, error }] = usePatchUserMutation();

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [secondPassword, setSecondPassword] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await patchUser({ id, username, email, password })
            console.log(response)
            navigate("/account")
        }
        catch (error) {
            console.error(error)
        }
    }
    if (error) {
        return <div>Error</div>
    }
    if (isLoading) {
        return <div><LoadingMessage/></div>
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
                            placeholder={userData.username}
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                        />
                        <TextField
                            label="Update E-mail"
                            placeholder={userData.email}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            size="small"
                            type="email"
                            variant="filled"
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