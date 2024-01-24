import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../redux/api"
import MobileMapCategories from "./Mobile/MobileMapCategories";
import DesktopMapCategories from "./Desktop/DesktopMapCategories";

const MapCategories = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data, error, isLoading } = useGetCategoriesQuery();
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }
    console.log(data);

    return (
        <>
            {isMobile ?
                <>
                    <MobileMapCategories />
                </>
                : //is NOT mobile...
                <>
                  <DesktopMapCategories />
                </>
            }

        </>
    )
}

export default MapCategories
