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
                <Box key={category.id} sx={{ m: 1 }}>
                    <Link to={`/category/${category.id}`}
                        style={{ textDecoration: "none" }}>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Stack direction="column">
                                <span className="category-circle">
                                    <Typography
                                        sx={{
                                            color: "#38300A",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            mt: 6,
                                        }}>
                                        {category.category}
                                    </Typography>
                                </span>
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