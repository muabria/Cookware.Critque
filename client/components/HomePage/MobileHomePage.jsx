import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import AllPost from "../Posts/AllPosts";
import MapCategories from "../Categories/MapCategories";
import background from "../images/kitchenEquipmentBackground.png"
import MapAllEquipment from "../EquipmentsWithReviews/MapAllEquipment";

const MobileHomePage = () => {
    return (
        <>

            <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", m: 1, fontSize: "20px" }}>
                Welcome to Cookware Critique
            </Typography>
            <Typography sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                Home to honest critiques for all types of kitchen equipment from food prep to clean up.
            </Typography>
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "contain",
                height: "800px",
                backgroundRepeat: "no-repeat"
            }}>
                <Box>
                    <Grid container>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={5.5}>
                            <Box sx={{ mt: 12 }}>
                                <motion.div whileHover={{ scale: 1.3 }}>
                                    <Link to="/posts"
                                        style={{ textDecoration: "none" }}>
                                        <Box sx={{
                                            color: "#FAF3F0",
                                            backgroundColor: "#D988B9",
                                            border: "solid #B0578D 2px",
                                            borderRadius: "100px",
                                            fontSize: "11px",
                                            maxWidth: 200,
                                            m: 1,
                                            mb: 10
                                        }}>
                                            <Typography
                                                variant="h6"
                                                sx={{ textAlign: "center" }}>
                                                Find New Equipment
                                            </Typography>
                                        </Box>
                                    </Link>
                                </motion.div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Typography
                    variant="h5"
                    sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                    Find New Equipment by Category:
                </Typography>
                    <MapCategories />
                <MapAllEquipment />
            </div>
        </>
    )
}

export default MobileHomePage