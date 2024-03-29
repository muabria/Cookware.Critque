import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";

import DesktopMapComments from "./DesktopMapComments";
import DesktopMapPosts from "./DesktopMapPosts";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { useGetUserQuery } from "../../../../redux/api";
import LogoutButton from "../../../Navigation/Buttons/LogoutButton";

const DesktopUserDashboard = () => {

    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const { data, error, isLoading } = useGetUserQuery();

    if (!token) {
        navigate("/");
    }
    if (isLoading) {
        return null
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
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Stack direction="column">
                            <Box sx={{ my: 5 }}>
                                {data.isAdmin === true ?
                                    <Link to="/admin_dashboard">
                                        <button className="admin-button" style={{ width: "90%" }}>
                                            Admin Dashboard
                                        </button>
                                    </Link>
                                    :
                                    <Link to="/dummy_admin">
                                        <button className="admin-button" style={{ width: "90%" }}>
                                            Admin Dashboard
                                        </button>
                                    </Link>
                                }
                                <Link to="/account/edit" style={{ textDecoration: "none" }}>
                                    <button className="dash-critique-button" style={{ width: "90%" }}>
                                        Edit Account
                                    </button>
                                </Link>
                                <button className="dash-critique-button" style={{ width: "90%" }} onClick={async () => { await logout(); navigate("/"); }}>
                                    Logout
                                </button>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        <Stack direction="row">
                            <Typography variant="h3" sx={{ color: "#205375" }}>
                                Hello, {data.username}
                            </Typography>
                        </Stack>
                        <Card
                            className="dashboard-background"
                            elevation={10}
                            sx={{ mr: 5, mb: 10 }}>
                            <Typography variant="h6" sx={{ color: "#205375", mx: 2, mt: 1 }}>
                                Email: {data.email}
                            </Typography>
                            <Stack direction="row">
                                <Grid item xs={9}>
                                    <DesktopMapPosts />
                                </Grid>
                                <Grid item xs={3}>
                                    <DesktopMapComments />
                                </Grid>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    )
}

export default DesktopUserDashboard