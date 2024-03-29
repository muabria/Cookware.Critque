import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { motion } from "framer-motion";

import { useNavigate, useParams } from "react-router-dom";

import { usePatchUserMutation, useGetUserQuery } from "../../../redux/api";
import { useState } from "react";

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

    const populateForm = (event) => {
        event.preventDefault();
        setUsername(userData.username);
        setEmail(userData.email);
    }

    if (error) {
        return <div>Error</div>
    }
    if (isLoading) {
        return <div> </div>
    }

    return userData && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Card
                className="auth-form"
                elevation={10}
                sx={{ mb: 10}}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "#205375", p: 1 }}>
                    Update Your Account:
                </Typography>
                <Typography textAlign="center" sx={{mb: 1.5}}>
                    <button onClick={populateForm} className="blue-button">
                        Populate Form
                    </button>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column">
                        <TextField
                            label="Update Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ m: 1 }}
                        />
                        <TextField
                            label="Update E-mail"
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
                            sx={{ m: 1 }}
                            error={
                                !!(password && secondPassword !== secondPassword)
                            }
                            helperText={
                                password && secondPassword && password !== secondPassword ?
                                    <Alert severity="error"> Passwords do not match </Alert> : null
                            }
                        />
                        <Typography textAlign="center" sx={{mt: 1}}>
                            <button
                                type="submit"
                                className="blue-button">
                                Update
                            </button>
                        </Typography>
                        <Typography textAlign="center">
                            <button className="admin-button" onClick={() => navigate("/account")} style={{ width: 100 }}>
                                Cancel
                            </button>
                        </Typography>
                    </Stack>
                </form>
            </Card>
        </motion.div>
    )
}
export default EditUser