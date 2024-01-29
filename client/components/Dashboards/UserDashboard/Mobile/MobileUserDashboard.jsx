import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";

import MobileMapPosts from "./MobileMapPosts";
import MobileMapComments from "./MobileMapComments";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { useGetUserQuery } from "../../../../redux/api";

const MobileUserDashboard = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const { data, error, isLoading } = useGetUserQuery();

    if (!token) {
        navigate("/");
    }
    if (isLoading) {
        console.log("Loading...")
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
                                :
                                <Link to="/dummy_admin">
                                    <Button sx={{
                                        textTransform: "none",
                                        m: 1,
                                        boxShadow: 3,
                                        color: "#205375",
                                        backgroundColor: "#E7B10A",
                                        border: "solid #D29D2B 2px"
                                    }}>
                                        View Dummy Admin Dashboard
                                    </Button>
                                </Link>
                            }
                            <Link to="/new_review">
                                <Button sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", m: 1 }}>
                                    Make a new Critique
                                </Button>
                            </Link>
                            <Stack direction="column">
                                <Grid item xs={12}>
                                    <MobileMapPosts />
                                </Grid>
                                <Grid item xs={12}>
                                    <MobileMapComments />
                                </Grid>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    )
}

export default MobileUserDashboard