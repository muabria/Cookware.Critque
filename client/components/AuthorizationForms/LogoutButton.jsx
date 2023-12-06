import Button from "@mui/material/Button"
import LoadingMessage from "../ErrorMessages/LoadingMessage"
import { useLogoutMutation } from "../../redux/api"

const LogoutButton = () => {
    const [logout, { data, error, isLoading }] = useLogoutMutation();
    if (isLoading){
        return (<LoadingMessage/>)
    }
    if (data){
        console.log("logout" + data);
    }
    if (error) {
        console.log("logout" + error)
    }
    return (
        <>
            <Button onClick={logout}>
                Logout
            </Button>
        </>
    )
}
export default LogoutButton