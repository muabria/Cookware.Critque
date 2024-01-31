import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import MobileMapAllUsers from "./components/MobileMapUsers";
import MobileAddEquipment from "./components/MobileAddEquipment";
import MobileAdminMapPosts from "./components/MobileAdminMapPosts";
import MobileAdminMapEquip from "./components/MobileAdminMapEquip";

const MobileAdminDashboard = () => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeIn" }}>
                        <Grid container spacing={1}>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={10}>
                                <Box sx={{ mb: 1 }}>
                                    <Stack direction="column">
                                        <Typography
                                            variant="h4"
                                            sx={{ color: "#205375" }}>
                                            Hello Admin!
                                        </Typography>
                                        <Link to="/account">
                                            <Button sx={{ textTransform: "none", backgroundColor: "#088395", color: "white" }}>
                                                Return to User View
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Box>
                                <Card className="dashboard-background">
                                   <MobileAddEquipment />
                                   <MobileAdminMapEquip />
                                    <Grid item xs={12}>
                                        <MobileMapAllUsers />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MobileAdminMapPosts />
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
            </motion.div>
        )
}
export default MobileAdminDashboard