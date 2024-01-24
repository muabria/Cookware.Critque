import Button from "@mui/material/Button"

import { useSelector } from "react-redux";

import { motion } from "framer-motion"

import { Link } from "react-router-dom"

const AddReviewButton = () => {
    const token = useSelector((state) => state.auth.token);
    return (
        <div>
            {token &&
                <Link to="/new_review"
                    style={{ textDecoration: "none" }}>
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <Button
                            variant="text"
                            sx={{ color: "#205375", mx: 5, mt: 1, textTransform: "none", backgroundColor: "transparent" }}>
                            Add a Review
                        </Button>
                    </motion.div>
                </Link>
            }
        </div>
    )
}
export default AddReviewButton