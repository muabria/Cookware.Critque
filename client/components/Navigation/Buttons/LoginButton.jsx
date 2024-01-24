import Button from "@mui/material/Button"

import { Link } from "react-router-dom"

const LoginButton = () => {
    return (
        <div>
                <Link
                    to="/login"
                    style={{ textDecoration: "none" }}>
                    <Button
                        variant="text"
                        sx={{ color: "#205375", textTransform: "none", backgroundColor: "transparent" }}>
                        Login
                    </Button>
                </Link>
        </div >
    )
}
export default LoginButton