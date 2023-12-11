import Typography from "@mui/material/Typography"
import LoadingMessage from "../ErrorMessages/LoadingMessage"
import { useLogoutMutation } from "../../redux/api"
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const [logout, { data, error, isLoading }] = useLogoutMutation();
    const navigate = useNavigate();

    if (data){
        console.log("logout", data);
    }
    if (error) {
        console.log("logout" + error)
    }
    return (
        <>
            <Typography onClick={async () => {await logout(); navigate("/");}}>
                Logout
            </Typography>
        </>
    )
}
export default LogoutButton