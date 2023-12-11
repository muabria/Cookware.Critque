import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../redux/api"
import LoadingMessage from "../ErrorMessages/LoadingMessage";

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
                    {data && data.map((category) => (
                        <Button>
                            <motion.div whileHover={{ scale: 1.3 }}>
                                <Link to={`/category/${category.id}`}
                                    style={{ textDecoration: "none" }}>
                                    <Card sx={{
                                        textTransform: "none",
                                        boxShadow: 3,
                                        color: "#3C1B1F",
                                        backgroundColor: "#E7B10A",
                                        border: "solid #D29D2B 2px" }} >
                                        <Typography>
                                            {category.category}
                                        </Typography>
                                    </Card>
                                </Link>
                            </motion.div>
                        </Button>
                    ))
                    }
                </>
                : //is NOT mobile...
                <>
                    {data && data.map((category) => (
                        <Box key={category.id} sx={{ m: 2 }}>
                            <Link to={`/category/${category.id}`}
                                style={{ textDecoration: "none" }}>
                                <motion.div whileHover={{ scale: 1.3 }}>
                                    <Avatar
                                        sx={{
                                            boxShadow: 3,
                                            p: 3,
                                            color: "#3C1B1F",
                                            backgroundColor: "#E7B10A",
                                            border: "solid #D29D2B 2px"
                                        }}>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {category.category}
                                        </Typography>
                                    </Avatar>
                                </motion.div>
                            </Link>
                        </Box>
                    ))
                    }
                </>
            }

        </>
    )
}

export default MapCategories
