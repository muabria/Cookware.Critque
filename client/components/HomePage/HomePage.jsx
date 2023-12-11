
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useMediaQuery, useTheme } from '@mui/material';

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import AllPost from "../Posts/AllPosts";
import MapCategories from "../Categories/MapCategories";
import background from "../images/kitchenEquipmentBackground.png"
import MapAllEquipment from "../EquipmentsWithReviews/MapAllEquipment";
import MobileHomePage from "./MobileHomePage";

const HomePage = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}>
            {isMobile ?
                <>
                    <MobileHomePage />
                </>
                :
                <>
                    <Typography variant="h2" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                        Welcome to Title Placeholder
                    </Typography>
                    <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", fontSize: "30px", m: 1 }}>
                        Home to honest critiques for all types of kitchen equipment from food prep to clean up.
                    </Typography>
                    <div style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: "contain",
                        height: "700px",
                        backgroundRepeat: "no-repeat"
                    }}>
                        <Box sx={{ minHeight: 900, my: 2 }}>
                            <Grid container>
                                <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={11} sx={{ mb: 25 }}>
                                    <Stack direction="row">
                                        <MapCategories />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5.5}>
                                </Grid>
                                <Grid item xs={6.5}>
                                    <Stack direction="row">
                                        <motion.div whileHover={{ scale: 1.3 }}>
                                            <Link
                                                to="/posts"
                                                style={{ textDecoration: "none" }}>
                                                <Box sx={{
                                                    boxShadow: 3,
                                                    color: "#FAF3F0",
                                                    backgroundColor: "#D988B9",
                                                    border: "solid #B0578D 2px",
                                                    borderRadius: "100px",
                                                    p: 3
                                                }}>
                                                    <Typography variant="h6">
                                                        Find New Equipment
                                                    </Typography>
                                                </Box>
                                            </Link>
                                        </motion.div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <AllPost />
                    <MapAllEquipment />
                </>

            }
        </motion.div>
    )
}

export default HomePage