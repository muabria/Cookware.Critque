import { useMediaQuery, useTheme } from '@mui/material';

import { useLoginMutation, useGetAllUsersValidationQuery } from "../../redux/api";
import MobileLoginForm from "./Mobile/MobileLogin";
import DesktopLoginForm from "./Desktop/DesktopLogin";

const LoginForm = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            {isMobile
                ?
                <div>
                    <MobileLoginForm />
                </div>
                :
                <div>
                    <DesktopLoginForm />
                </div>}

        </div>
    )
}
export default LoginForm