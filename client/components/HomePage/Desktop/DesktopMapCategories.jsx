import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../../redux/api";

const DesktopMapCategories = () => {
    const { data, error, isLoading } = useGetCategoriesQuery();
    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }
    return (
        <>
            {data && data.map((category) => (
                <Box key={category.id} sx={{ m: 2 }}>
                    <Link to={`/category/${category.id}`}
                        style={{ textDecoration: "none" }}>
                        <motion.div whileHover={{ scale: 1.3 }}>
                            <Stack direction="column">
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
                            </Stack>
                        </motion.div>
                    </Link>
                </Box>
            ))
            }
        </>
    )
}
export default DesktopMapCategories