import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import MapPosts from "./MapPosts";
import MapComments from "./MapComments";

import { useMediaQuery, useTheme } from '@mui/material';

import { Link } from "react-router-dom";

import { useGetUserQuery } from "../../redux/api";

const UserDashboard = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetUserQuery()
    if (!data) {
        return <div>No data</div>
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div> Oops! Something went wrong loading the data. </div>;
    } else
        console.log(data);
    //Patch user
    return (
        <>
            <Box>
                {isMobile ?
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={1}>
                            </Grid>

                            <Grid item xs={10}>
                                <Typography variant="h5" sx={{ color: "#205375" }}>
                                    Hello, {data.username}
                                </Typography>
                                <Card sx={{ backgroundColor: "#8da6a9", minHeight: 500 }}>
                                    {data.isAdmin === true ?
                                        <Link to="/admin_dashboard">
                                            <Button sx={{
                                                m: 1,
                                                boxShadow: 3,
                                                color: "#205375",
                                                backgroundColor: "#E7B10A",
                                                border: "solid #D29D2B 2px"
                                            }}>
                                                View Admin Dashboard
                                            </Button>
                                        </Link>
                                        : //If not admin, return nothing
                                        <>
                                        </>}
                                    <Link to="/new_review">
                                        <Button sx={{ backgroundColor: "#088395", color: "white", m: 1 }}>
                                            Make a new Critique
                                        </Button>
                                    </Link>
                                    <Stack direction="column">
                                        <Grid item xs={12}>
                                            <MapPosts />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MapComments />
                                        </Grid>
                                    </Stack>
                                </Card>
                            </Grid>

                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </div>

                    ://is NOT mobile...
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Stack direction="column">
                                <Typography sx={{ color: "#205375", my: 5 }}>
                                    <ManageAccountsIcon sx={{ color: "#205375" }} />
                                    Account Information
                                </Typography>
                                <Typography sx={{ my: 5, color: "#205375" }}>
                                    <LogoutSharpIcon sx={{ color: "#205375" }} /> Logout
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={10}>
                            <Stack direction="row">
                                <Typography variant="h3" sx={{ color: "#205375" }}>
                                    Hello, {data.username}
                                </Typography>
                            </Stack>
                            <Card sx={{ backgroundColor: "#8da6a9", minHeight: 500 }}>
                                {data.isAdmin === true ?
                                    <Link to="/admin_dashboard">
                                        <Button sx={{
                                            m: 1,
                                            boxShadow: 3,
                                            color: "#205375",
                                            backgroundColor: "#E7B10A",
                                            border: "solid #D29D2B 2px"
                                        }}>
                                            View Admin Dashboard
                                        </Button>
                                    </Link>
                                    : //If not admin, return nothing
                                    <>
                                    </>}
                                <Link to="/new_review">
                                    <Button sx={{ backgroundColor: "#088395", color: "white", m: 2 }}>
                                        Make a new Critique
                                    </Button>
                                </Link>
                                <Stack direction="row">
                                    <Grid item xs={6}>
                                        <MapPosts />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MapComments />
                                    </Grid>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                }
            </Box>
        </>
    )
}

export default UserDashboard