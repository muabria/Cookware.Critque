import Button from "@mui/material/Button"

import { motion } from "framer-motion"

import { Link } from "react-router-dom"

const SignUpButton = () => {
    return (
        <div>
             <Link
                    to="/register"
                    style={{ textDecoration: "none" }}>
                    <Button
                        variant="text"
                        sx={{ color: "#205375", textTransform: "none", backgroundColor: "transparent" }}>
                        Sign Up
                    </Button>
                </Link>

        </div>
    )
}
export default SignUpButton