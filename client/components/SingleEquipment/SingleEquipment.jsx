import { useMediaQuery, useTheme } from "@mui/material";

import DesktopSingleEquipment from "./DesktopSingleEquipment";
import MobileSingleEquipment from "./MobileSingleEquipment";

const SingleEquipment = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            {isMobile ?
                <MobileSingleEquipment />
                : //is NOT mobile...
                <DesktopSingleEquipment />
            }
        </div>
    )
}

export default SingleEquipment;