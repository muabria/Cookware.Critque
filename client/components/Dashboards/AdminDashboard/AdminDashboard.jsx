import { useMediaQuery, useTheme } from '@mui/material';

import MobileAdminDashboard from "./Mobile/MobileAdminDashboard";
import DesktopAdminDashboard from "./Desktop/DesktopAdminDashboard";

const AdminDashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
        return (
            <div>
                {isMobile ?
                    <div>
                        <MobileAdminDashboard />
                    </div>
                    : //is NOT mobile...
                    <div>
                        <DesktopAdminDashboard />
                    </div>}
            </div>
        )
}
export default AdminDashboard