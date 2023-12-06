import Button from "@mui/material/Button"

import { useLogoutMutation } from "../../redux/api"

const LogoutButton = () => {
    const [logout, { data, error, isLoading }] = useLogoutMutation();
    if (error) {
        console.log(error)
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