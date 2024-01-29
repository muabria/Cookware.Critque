import { motion } from "framer-motion";

import { useMediaQuery, useTheme } from "@mui/material";

import "react-multi-carousel/lib/styles.css";

import MobileNewPost from "./MobileNewPost";
import DesktopAddNewPost from "./DesktopNewPost";

const AddNewPost = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}>
            {isMobile ?
                <div>
                    <MobileNewPost />
                </div>
                : //is NOT mobile...
                <div>
                    <DesktopAddNewPost />
                </div>}
        </motion.div>
    )
}
export default AddNewPost