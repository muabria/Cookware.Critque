import Accordion from "@mui/material/Accordion";
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import { useState } from 'react';

import { useDeleteUserMutation, useGetAllUsersQuery, usePatchToggleAdminMutation } from "../../../../../redux/api";

const MobileMapAllUsers = () => {
    const [alert, setAlert] = useState(null);

    const [deleteUser] = useDeleteUserMutation();
    const { data, error, isLoading } = useGetAllUsersQuery();
    const [patchToggleAdmin] = usePatchToggleAdminMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    return (
        <div>
            <Accordion sx={{ m: 2, backgroundColor: "#D9E4DD" }}>
                <AccordionSummary>
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", color: "#205375" }}>
                        All Users <ExpandCircleDownIcon sx={{ color: "#205375" }} />
                    </Typography>
                </AccordionSummary>
                {data && data.slice().sort((a, b) => a.username.localeCompare(b.username)).map((user) => (
                    <Card key={user.id} sx={{ m: 1, p: 2 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography sx={{ color: "#205375", backgroundColor: "#EEF5FF", p: 1, mx: 1, my: .5, borderRadius: "10px" }}>
                                    username: {user.username}
                                </Typography>
                                <Typography sx={{ color: "#205375", backgroundColor: "#EEF5FF", p: 1, mx: 1, my: .5, borderRadius: "10px" }}>
                                    email: {!user.email ? "No email" : user.email}
                                </Typography>
                                <Typography sx={{ color: "#205375", backgroundColor: "#EEF5FF", p: 1, mx: 1, my: .5, borderRadius: "10px" }}>
                                    admin: {user.isAdmin.toString()}
                                </Typography>
                                <Box sx={{ color: "#205375", backgroundColor: "#EEF5FF", p: 1, mx: 1, my: .5, borderRadius: "10px" }}>
                                    <Stack direction="row">
                                        <Typography>
                                            Regular
                                        </Typography>
                                        <Switch
                                            defaultChecked={user.isAdmin}
                                            onChange={async () => {
                                                console.log("toggle admin");
                                                console.log(user)
                                                const response = await patchToggleAdmin({ id: user.id, isAdmin: !user.isAdmin });
                                                console.log(response)
                                            }} />
                                        <Typography>
                                            Admin
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() => setAlert(user.id)}
                                    color="error"
                                    sx={{ mx: 11 }}>
                                    <DeleteForeverSharpIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        {alert === user.id &&
                            <Alert severity="warning">
                                <Stack direction="column">
                                    Are you sure you want to delete user?
                                    <Button
                                        onClick={(console.log("Delete"))}
                                        variant="outlined"
                                        color="error"
                                        sx={{ textTransform: "none", m: 1 }}>
                                        Yes, delete this user.
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlert(null)}
                                        sx={{ textTransform: "none", m: 1 }}>
                                        No, keep this user active.
                                    </Button>
                                </Stack>
                            </Alert>}
                    </Card>
                ))}
            </Accordion>
        </div>
    )
}

export default MobileMapAllUsers