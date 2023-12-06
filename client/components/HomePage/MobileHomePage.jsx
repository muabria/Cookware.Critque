import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

            <Typography variant="h4" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                Welcome to "TITLE PLACEHOLDER".
            </Typography>
            <Typography sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                Home to honest critiques for all types of kitchen equipment from food prep to clean up.
            </Typography>
            <Link to="/posts">
                <Stack direction="row">
                    <MapCategories />
                </Stack>
            </Link>
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
                        <Grid item xs={6}>
                            <Box sx={{ mt: 11 }}>
                                <motion.div whileHover={{ scale: 1.3 }}>
                                    <Link to="/posts">
                                        <Button sx={{
                                            color: "#FAF3F0",
                                            backgroundColor: "#D988B9",
                                            border: "solid #B0578D 2px",
                                            borderRadius: "100px",
                                            fontSize: "11px",
                                            m: 1
                                        }}>
                                            Find New Equipment
                                        </Button>
                                    </Link>
                                </motion.div>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                        </Grid>

                    </Grid>
                </Box>
                <MapAllEquipment />
            </div>
        </>
    )
}

export default MobileHomePage