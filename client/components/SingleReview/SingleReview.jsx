import { useMediaQuery, useTheme } from "@mui/material";

import MobileSingleReview from "./MobileSingleReview";
import DesktopSingleReview from "./DesktopSingleReview";

const SingleReview = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile ?
                <MobileSingleReview />
                : //is NOT mobile...
                <DesktopSingleReview />
            }
        </div>
    )
}

export default SingleReview;