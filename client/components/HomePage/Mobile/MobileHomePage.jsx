import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import background from "../kitchenEquipmentBackground.png"
import MobileMapCategories from "./MobileMapCategories";

const MobileHomePage = () => {
    return (
        <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
            <img
                src={background}
                alt="Background image of kitchen supplies"
                style={{
                    marginTop: "10px",
                    zIndex: -1,
                    marginLeft: "20%",
                    backgroundSize: "contain",
                    height: "200px",
                    position: "absolute"
                }} />
            <Typography variant="h1" sx={{ color: "#205375", fontWeight: "bold", fontSize: "33px", mx: 3 }}>
                Cookware Critique
            </Typography>
            <Typography
                variant="h4"
                sx={{ color: "#205375", fontSize: "12px", mt: 7, ml: 3, mr: 23 }}>
                Home to honest critiques for all types of kitchen equipment, from food prep to clean up.
            </Typography>
            <Box sx={{ mt: 1, mx: 6 }}>
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                        to="/explore"
                        style={{ textDecoration: "none" }}>
                        <button className="nav-button" style={{ fontSize: "16px" }}>
                            See Reviews
                        </button>
                    </Link>
                </motion.div>
            </Box>
            <MobileMapCategories />
        </div>
    )
}
export default MobileHomePage