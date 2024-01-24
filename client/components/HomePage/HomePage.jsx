import { useMediaQuery, useTheme } from '@mui/material';

import { motion } from "framer-motion";

import MobileHomePage from "./Mobile/MobileHomePage";
import DesktopHomePage from "./Desktop/DesktopHomePage";

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
                 <div>
                    <DesktopHomePage />
                    </div>
                </>

            }
        </motion.div>
    )
}

export default HomePage