import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import MapPosts from "./MapPosts";
import MapComments from "./MapComments";

import { useMediaQuery, useTheme } from '@mui/material';

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { useGetUserQuery } from "../../redux/api";
import AccountRedirect from "../ErrorMessages/AccountRedirect";
import LoadingMessage from "../ErrorMessages/LoadingMessage";
import LogoutButton from "../AuthorizationForms/LogoutButton";

const UserDashboard = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const { data, error, isLoading } = useGetUserQuery();

    if (!token) {
        navigate("/");
    }
    if (!data) {
        return (<div><AccountRedirect /></div>)
    }
    if (error) {
        return <div> Oops! Something went wrong loading your data. </div>;
    } else
        console.log(data);
    //Patch user
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Box>
                {isMobile ?
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={10}>
                                <Stack direction="column">
                                    <Typography variant="h2" sx={{ fontSize: "22px", color: "#205375" }}>
                                        Hello, {data.username}
                                    </Typography>
                                    <Link to="/account/edit" style={{ textDecoration: "none", color: "#205375" }}>
                                        <ManageAccountsIcon sx={{ color: "#205375", }} />
                                    </Link>
                                </Stack>
                                <Card sx={{ backgroundColor: "#8da6a9", minHeight: 500 }}>
                                    {data.isAdmin === true ?
                                        <Link to="/admin_dashboard">
                                            <Button sx={{
                                                textTransform: "none",
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
                                        <Button sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", m: 1 }}>
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
                                <Typography sx={{ my: 5, mx: 2 }}>
                                    <Link to="/account/edit" style={{ textDecoration: "none", color: "#205375" }}>
                                        <ManageAccountsIcon sx={{ color: "#205375" }} />
                                        Edit Account
                                    </Link>
                                </Typography>
                                <Typography sx={{ my: 5, mx: 2, color: "#205375" }}>
                                    <LogoutSharpIcon sx={{ color: "#205375" }} /> <LogoutButton />
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
                                <Typography variant="h6" sx={{ color: "#205375", mx: 2, mt: 1 }}>
                                    Email: {data.email}
                                </Typography>
                                {data.isAdmin === true ?
                                    <Link to="/admin_dashboard">
                                        <Button sx={{
                                            textTransform: "none",
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
                                    <Button sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", m: 2 }}>
                                        Make a new critique
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
        </motion.div>
    )
}

export default UserDashboard