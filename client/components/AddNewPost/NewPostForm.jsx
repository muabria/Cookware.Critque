import { useState } from "react";

import Stack from "@mui/material/Stack";
import AddEquipment from "./AddEquipment";
import AddPostContent from "./AddPostContent";

const NewPostForm = () => {


    return (
        <>
        <Stack direction="row" spacing={5}>
            <AddEquipment />
            <AddPostContent />
            </Stack>
        </>
    )
}
export default NewPostForm