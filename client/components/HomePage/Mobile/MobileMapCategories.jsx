import Button from "@mui/material/Button";
import Card from "@mui/material/Card"
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
            {data && data.map((category) => (
                <Button>
                    <motion.div whileHover={{ scale: 1.3 }}>
                        <Link to={`/category/${category.id}`}
                            style={{ textDecoration: "none" }}>
                            <Card sx={{
                                boxShadow: 3,
                                color: "#3C1B1F",
                                backgroundColor: "#E7B10A",
                                border: "solid #D29D2B 2px"
                            }} >
                                <Typography>
                                    {category.category}
                                </Typography>
                            </Card>
                        </Link>
                    </motion.div>
                </Button>
            ))
            }
        </div>
    )
}
export default MobileMapCategories