import { useMediaQuery, useTheme } from '@mui/material';

import MobileUserDashboard from "./Mobile/MobileUserDashboard";
import DesktopUserDashboard from "./Desktop/DesktopUserDashboard";

const UserDashboard = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    return (
            <div>
                {isMobile ?
                    <MobileUserDashboard />
                    ://is NOT mobile...
                    <DesktopUserDashboard />
                }
            </div>
    )
}

export default UserDashboard