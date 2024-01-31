import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
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
                            <Typography sx={{ my: 5 }}>
                                <Link to="/account/edit" style={{ textDecoration: "none" }}>
                                    <ManageAccountsIcon sx={{ ml: 2, color: "#205375" }} />
                                    <Button sx={{ color: "#205375", textTransform: "none" }}>
                                        Edit Account
                                    </Button>
                                </Link>
                            </Typography>
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
                            elevation={10}>
                            <Typography variant="h6" sx={{ color: "#205375", mx: 2, mt: 1 }}>
                                Email: {data.email}
                            </Typography>
                            {data.isAdmin === true ?
                                <Link to="/admin_dashboard">
                                    <button className="admin-button">
                                        Admin Dashboard
                                    </button>
                                </Link>
                                :
                                <Link to="/dummy_admin">
                                    <button className="admin-button">
                                        Admin Dashboard
                                    </button>
                                </Link>
                            }
                            <Link to="/new_review">
                                <button className="critique-button">
                                    Make a Citique
                                </button>
                            </Link>
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