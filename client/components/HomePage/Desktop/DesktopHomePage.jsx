import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import DesktopMapCategories from "./DesktopMapCategories";
import background from "../kitchenEquipmentBackground.png"

const DesktopHomePage = () => {
    return (
        <div className="no-overflow">
            <img
                src={background}
                alt="Background image of kitchen supplies"
                style={{
                    marginTop: "5px",
                    zIndex: -1,
                    marginLeft: "35%",
                    backgroundSize: "contain",
                    height: "700px",
                    position: "absolute"
                }} />
            <Typography
                variant="h1"
                sx={{ color: "#205375", fontWeight: "bold", mx: 3 }}>
                Cookware Critique
            </Typography>
            <Box sx={{ minHeight: 900, my: 2 }}>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography
                            variant="h4"
                            sx={{ color: "#205375", mt: 1, ml: 5, mr: 12 }}>
                            Home to honest critiques for all types of kitchen equipment from food prep to clean up.
                        </Typography>
                    </Grid>
                    <Grid item xs={7} sx={{ mx: 3, mt: 10 }}>
                        <Stack direction="row">
                            <DesktopMapCategories />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={10} sx={{ mt: 10 }}>
                        <Stack direction="row">
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link
                                    to="/explore"
                                    style={{ textDecoration: "none" }}>
                                    <button className="nav-button">
                                        See Reviews
                                    </button>
                                </Link>
                            </motion.div>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
export default DesktopHomePage