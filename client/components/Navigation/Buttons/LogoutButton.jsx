import Button from "@mui/material/Button";

import { useLogoutMutation } from "../../../redux/api";

import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const [logout, { data, error, isLoading }] = useLogoutMutation();
    const navigate = useNavigate();

    if (isLoading) {
        return null;
    }
    if (data) {
        console.log("logout", data);
    }
    if (error) {
        console.log("logout" + error)
    }
    return (
        <>
            <Button
                onClick={async () => { await logout(); navigate("/"); }}
                variant="text"
                sx={{ color: "#205375", mx: 5, mt: 1, textTransform: "none", backgroundColor: "transparent" }}>
                    Logout
            </Button>
        </>
    )
}
export default LogoutButton