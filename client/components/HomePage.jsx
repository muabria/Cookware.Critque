
import Stack from "@mui/material/Stack";

import AllPost from "../AllPosts"
import MapCategories from "./SearchEquipment/MapCategories"
import { Typography } from "@mui/material";

const HomePage = () => {
    return (
        <>
            <Stack direction="row">
                <MapCategories />
            </Stack>
            <AllPost />
        </>
    )
}

export default HomePage