import { useMediaQuery, useTheme } from '@mui/material';

import MobileMapComments from "./MobileMapComments";
import DesktopMapComments from "./DesktopMapComments";

const MapComments = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            {isMobile ?
                <div>
                    <MobileMapComments />
                </div>
                : //if is NOT mobile...
                <div>
                    <DesktopMapComments />
                </div>
            }
        </div>
    )
}

export default MapComments