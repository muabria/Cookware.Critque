import { useMediaQuery, useTheme } from '@mui/material';

import MobileMapPosts from "./MobileMapPosts";
import DesktopMapPosts from "./DesktopMapPosts";

//<-----------------DELETE REVIEW HELPER FUNCTION------------------->

const MapPosts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {isMobile
                ?
                <div>
                    <MobileMapPosts />
                </div>
                : //is NOT mobile...
                <div>
                    <DesktopMapPosts />
                </div>}
        </>
    )
}

export default MapPosts