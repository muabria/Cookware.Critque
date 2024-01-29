import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import DesktopMapAllUsers from "./components/DesktopMapUsers";
import DesktopAddEquipment from "./components/DesktopAddEquipment";
import DesktopAdminMapPosts from "./components/DesktopAdminMapPosts";
import DesktopAdminMapEquip from "./components/DesktopAdminMapEquip";

const DesktopAdminDashboard = () => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Link to="/account">
                        <Button sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", mx: 1, mt: 10 }}>
                            Return to User View
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ mb: 1 }}>
                        <Typography
                            variant="h4"
                            sx={{ color: "#205375" }}>
                            Hello Dummy Admin!
                        </Typography>
                    </Box>
                    <Card sx={{ backgroundColor: "#8da6a9", minHeight: 500 }}>
                        <Typography sx={{ textAlign: "center", p: 1, backgroundColor: "#F9B8B3", m: 1.3, fontWeight: "bolder" }}>
                            Any changes you make here will not affect the site in any way.
                        </Typography>
                        <DesktopAddEquipment />
                        <DesktopAdminMapEquip />
                        <Stack direction="row">
                            <Grid item xs={6}>
                                <DesktopMapAllUsers />
                            </Grid>
                            <Grid item xs={6}>
                                <DesktopAdminMapPosts />
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </motion.div>
    )
}
export default DesktopAdminDashboard