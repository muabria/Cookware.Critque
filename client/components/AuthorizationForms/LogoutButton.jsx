import Button from "@mui/material/Typography"
import LoadingMessage from "../ErrorMessages/LoadingMessage"
import { useLogoutMutation } from "../../redux/api"
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const [logout, { data, error, isLoading }] = useLogoutMutation();
    const navigate = useNavigate();

    if (isLoading){
        return (<LoadingMessage/>)
    }
    if (data){
        console.log("logout", data);
    }
    if (error) {
        console.log("logout" + error)
    }
    return (
        <>
            <Button 
            sx={{ textTransform: "none" }}
            onClick={async () => {await logout(); navigate("/");}}>
                Logout
            </Button>
        </>
    )
}
export default LogoutButton