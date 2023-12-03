
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import AllPost from "./Posts/AllPosts";
import MapCategories from "./SearchEquipment/MapCategories"
import background from "./images/kitchenEquipmentBackground.png"
import MapAllEquipment from "./EquipmentsWithReviews/MapAllEquipment";

const HomePage = () => {
    return (
        <>
            <motion.div
                initial={{ x: "100vw" }}
                animate={{ x: "0vw" }}
                transition={{ type: "spring", delay: (0.5) }}>
                <Typography variant="h3" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                    Welcome to "TITLE PLACEHOLDER". 
                </Typography>
                <Typography variant="h5" sx={{ color: "#205375", textAlign: "center", m: 1 }}>
                     Home to honest critiques for all types of kitchen equipment from food prep to clean up. 
                </Typography>
            </motion.div>
            <div style={{ backgroundImage: `url(${background})`, backgroundSize: "contain", height:"700px", backgroundRepeat: "no-repeat" }}>
                <Box sx={{ minHeight: 900, my: 2 }}>
                    <Grid container>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={10} sx={{ mb: 25 }}>
                            <Stack direction="row">
                                <MapCategories />
                            </Stack>
                        </Grid>

                    </Grid>
                    {/* <------------BUTTON-----------> */}

                    <Grid container>
                        <Grid item xs={5.5}>
                        </Grid>
                        <Grid item xs={6.5}>
                            <Stack direction="row">
                                <Link to="/posts">
                                    <Button sx={{ color: "#FAF3F0", backgroundColor: "#D988B9", border: "solid #B0578D 5px", borderRadius: "100px", p: 3 }}>
                                        <Typography variant="h6">
                                            Explore New Additions to Your Kitchen
                                        </Typography>
                                    </Button>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            {/* <MapAllEquipment/> */}
            {/* <AllPost /> */}
        </>
    )
}

export default HomePage