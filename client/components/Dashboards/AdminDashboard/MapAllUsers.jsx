import Accordion from "@mui/material/Accordion";
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Preview';
import Switch from '@mui/material/Switch'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useMediaQuery, useTheme } from '@mui/material';

import { useState } from 'react';

import { useDeleteUserMutation } from "../../../redux/api";
import { useGetAllUsersQuery, usePatchToggleAdminMutation } from '../../../redux/api';

const MapAllUsers = () => {
    const [alert, setAlert] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [deleteUser, { isLoading: deleteIsLoading, Error: deleteError, data: deleteData }] = useDeleteUserMutation();
    const { data, error, isLoading } = useGetAllUsersQuery();
    const [patchToggleAdmin, { error: adminError, isLoading: adminIsLoading, data: adminData }] = usePatchToggleAdminMutation();

    const sortFunc = (a,b) => {
        if (a.username < b.username) return -1;
        if (a.username > b.username) return 1;
        return 0
    }

    if (!data) {
        return <div> Oops, our own web equipment is broken. We should have the issue resolved soon! </div>
    }
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }


    return (
        <>
            {isMobile ?
                <div>
                    <Accordion sx={{ m: 2, backgroundColor: "#D9E4DD" }}>
                        <AccordionSummary>
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center", color: "#205375" }}>
                                All Users <ExpandCircleDownIcon sx={{ color: "#205375" }} />
                            </Typography>
                        </AccordionSummary>
                        {data && data.slice().sort((a,b) => a.username.localeCompare(b.username)).map((user) => (
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
                                {alert === user.id  &&
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

                : //is NOT mobile
                <div>
                    <Card sx={{ backgroundColor: "#D3E0E2", m: 1 }}>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "#205375" }}>
                            All Users:
                        </Typography>
                        {data && data.slice().sort((a,b) => a.username.localeCompare(b.username)).map((user) => (
                            <Card key={user.id} sx={{ m: 1, p: 2 }}>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Typography sx={{ color: "#205375", backgroundColor: "#EEF5FF", p: 1, mx: 1, my: .5, borderRadius: "10px" }}>
                                            username: {user.username}
                                        </Typography>
                                        <Typography sx={{ color: "#205375", backgroundColor: "#EEF5FF", p: 1, mx: 1, my: .5, borderRadius: "10px" }}>
                                            email: {user.email}
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
                                                <Typography>Admin</Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            onClick={() => setAlert(user.id)}
                                            variant="outlined"
                                            color="error"
                                            sx={{ m: 1 }}>
                                            <DeleteForeverSharpIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                                {alert === user.id  &&
                                    <Alert severity="warning">
                                        <Stack direction="column">
                                            Are you sure you want to delete user?
                                            <Button
                                                onClick={(console.log("Delete"))}
                                                variant="outlined"
                                                color="error"
                                                sx={{textTransform: "none", m: 1 }}>
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
                    </Card>
                </div>}
        </>
    )
}

export default MapAllUsers