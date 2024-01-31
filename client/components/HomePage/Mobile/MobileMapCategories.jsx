import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../../redux/api";

const MobileMapCategories = () => {
    const { data, error, isLoading } = useGetCategoriesQuery();
    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div>Sorry! Something went wrong loading the categories.</div>;
    }

    return (
        <div>
            <Typography 
             variant="h4"
             sx={{ mx: 3, mt: 10, color: "#205375", fontSize: "14px", fontWeight: "bold" }}>
                Find new equipment by category:
            </Typography>
            <Stack direction="row" flexWrap="wrap" sx={{ mx: 3 }}>
                {data && data.map((category) => (
                    <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.3 }}>
                        <Link
                            to={`/category/${category.id}`}
                            style={{ textDecoration: "none" }}>
                            <button
                                className="mobile-category">
                                {category.category}
                            </button>
                        </Link>
                    </motion.div>
                ))
                }
            </Stack>
        </div>
    )
}
export default MobileMapCategories