import Button from "@mui/material/Button"

import { motion } from "framer-motion"

import { Link } from "react-router-dom"

const HomePageButton = () => {
    return (
        <div>
            <Link to="/"
                style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ scale: 1.2 }}>
                        <Button
                            variant="text"
                            sx={{ color: "#205375", mx: 5, mt: 1, textTransform: "none", backgroundColor: "transparent" }}>
                            Home
                        </Button>
                </motion.div>
            </Link>
        </div>
    )
}
export default HomePageButton