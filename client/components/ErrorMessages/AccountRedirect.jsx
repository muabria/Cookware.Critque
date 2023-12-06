import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import LoginForm from "../AuthorizationForms/LoginForm"
const AccountRedirect = () => {
    return (
        <>
            <Alert severity="info">
                <Typography variant="h4">
                    You need to be logged in to see your account
                </Typography>
            </Alert>
            <LoginForm />
        </>
    )
}
export default AccountRedirect