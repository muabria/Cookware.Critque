import Button from "@mui/material/Button"

import { Link } from "react-router-dom"

const MyAccountButton = () => {
    return (
        <div>
            <Link
                to="/account"
                style={{ textDecoration: "none" }}>
                <Button
                    variant="text"
                    sx={{ color: "#205375", mx: 5, mt: 1, textTransform: "none", backgroundColor: "transparent" }}>
                    My Account
                </Button>
            </Link>
        </div>
    )
}
export default MyAccountButton