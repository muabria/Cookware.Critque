import Button from "@mui/material/Button";

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
        </div>
    )
}
export default MobileMapCategories