import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import MapPosts from "./MapPosts";
import MapComments from "./MapComments";

const Dashboard = () => {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Stack direction="column">
                        <Typography variant="h6" sx={{ my: 5 }}>
                            <ManageAccountsIcon /> My Account
                        </Typography>
                        <Typography variant="h6" sx={{ my: 5 }}>
                            <LogoutSharpIcon /> Logout
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={10}>
                    <Stack direction="row">
                        <Avatar sx={{ mx: 3 }} />
                        <Typography variant="h4">
                            Hello, Name
                        </Typography>
                    </Stack>
                    <Card sx={{ backgroundColor: "#D3E0E2" }}>
                        <Grid item xs={6}>
                            <MapPosts />
                        </Grid>
                        <Grid item xs={6}>
                            <MapComments />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard