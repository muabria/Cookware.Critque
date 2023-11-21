import { useState } from "react";

import Button from "@mui/material/Button"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import BlenderIcon from '@mui/icons-material/Blender';

import SearchBar from "./SearchBar";
import MapCategories from "./MapCategories";


const SearchMenu = () => {
    return (
        <>
            <Accordion sx={{ p: 1, backgroundColor: "white" }}>
                <AccordionSummary
                    expandIcon={<BlenderIcon sx={{ color: "#205375" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography variant="h6" sx={{ color: "#205375" }}>Explore New Equipment</Typography>
                </AccordionSummary>
                <SearchBar />
            </Accordion>
        </>
    )
}

export default SearchMenu